import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

interface GhlSyncRequest {
  name: string;
  email: string;
  businessType: string;
  intent: 'hot' | 'warm' | 'low';
  painPoint: string;
  sessionId: string;
  phone?: string;
}

interface GhlSyncResponse {
  ghlContactId: string | null;
  success: boolean;
}

interface GhlContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tags: string[];
  customField: Record<string, string>;
}

interface GhlContactResponse {
  contact: {
    id: string;
    [key: string]: unknown;
  };
}

function parseName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) {
    return { firstName: 'Unknown', lastName: '' };
  }
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  return { firstName, lastName };
}

function intentToTag(intent: 'hot' | 'warm' | 'low'): string {
  const tagMap: Record<string, string> = {
    hot: 'nova-hot',
    warm: 'nova-warm',
    low: 'nova-low',
  };
  return tagMap[intent] ?? 'nova-low';
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    businessType,
    intent,
    painPoint,
    sessionId,
    phone,
  } = req.body as GhlSyncRequest;

  // Validate required fields
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is required' });
  }
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'email is required' });
  }
  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'sessionId is required' });
  }
  if (!intent || !['hot', 'warm', 'low'].includes(intent)) {
    return res.status(400).json({ error: 'intent must be hot, warm, or low' });
  }

  const ghlApiKey = process.env.GHL_API_KEY;
  if (!ghlApiKey) {
    console.error('GHL_API_KEY is not configured');
    return res.status(500).json({ error: 'GHL integration not configured' });
  }

  try {
    const { firstName, lastName } = parseName(name);

    const contactPayload: GhlContactPayload = {
      firstName,
      lastName,
      email,
      tags: [intentToTag(intent), 'nova-support'],
      customField: {
        lead_source: 'NOVA Support',
        business_type: businessType || '',
        pain_point: painPoint || '',
        chat_session_id: sessionId,
        nova_intent: intent,
      },
    };

    if (phone && typeof phone === 'string' && phone.trim() !== '') {
      contactPayload.phone = phone.trim();
    }

    // Create contact in GoHighLevel
    const ghlResponse = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ghlApiKey}`,
      },
      body: JSON.stringify(contactPayload),
    });

    if (!ghlResponse.ok) {
      const errorBody = await ghlResponse.text();
      console.error(`GHL API error ${ghlResponse.status}:`, errorBody);
      return res.status(502).json({
        error: 'Failed to create GHL contact',
        details: errorBody,
        success: false,
        ghlContactId: null,
      } as GhlSyncResponse & { error: string; details: string });
    }

    const ghlData = (await ghlResponse.json()) as GhlContactResponse;
    const ghlContactId = ghlData?.contact?.id ?? null;

    // Update chatLeads: set notified = 'yes' for this session
    const { error: updateError } = await supabase
      .from('chatLeads')
      .update({ notified: 'yes' })
      .eq('email', email)
      .eq('notified', 'no');

    if (updateError) {
      // Non-fatal: log but still return success since GHL contact was created
      console.error('Failed to update chatLeads notified status:', updateError);
    }

    const response: GhlSyncResponse = {
      ghlContactId,
      success: true,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('ghl-sync error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      success: false,
      ghlContactId: null,
    });
  }
}
