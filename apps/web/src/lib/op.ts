import { OpenPanel } from '@openpanel/web';

const clientId = import.meta.env.VITE_OP_CLIENT_ID;

export const op = new OpenPanel({
	clientId,
	disabled: clientId === 'undefined' || !clientId,
	trackScreenViews: true,
	trackOutgoingLinks: true,
	trackAttributes: true,
	sessionReplay: {
	  enabled: true,
	}
});
