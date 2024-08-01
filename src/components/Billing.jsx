// BillingIframe.js
import React from 'react';

const Billing = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <iframe
                src="/billing.html"
                style={{ border: 'none', width: '100%', height: '100%' }}
                title="Billing"
            ></iframe>
        </div>
    );
};

export default Billing;
