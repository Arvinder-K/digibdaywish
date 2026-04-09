// lib/feedback.js

const API_ROUTE = '/api/data';
const COOLDOWN_KEY = 'digibday_feedback_cooldown';

async function fetchFromApi() {
    try {
        const res = await fetch(API_ROUTE, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch data');
        return await res.json();
    } catch (e) {
        console.error("API Fetch Error:", e);
        return { feedback: [], messages: [], visits: 0 };
    }
}

async function postToApi(action, payload) {
    try {
        const res = await fetch(API_ROUTE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, payload })
        });
        if (!res.ok) throw new Error('Failed to execute action');
        return await res.json();
    } catch (e) {
        console.error("API Post Error:", e);
        return null;
    }
}

export const recordVisit = async () => {
    if (typeof window === 'undefined') return;
    
    // Use session storage so we only hit the API once per browser session
    const visited = sessionStorage.getItem('digibday_session_visit');
    if (!visited) {
        sessionStorage.setItem('digibday_session_visit', 'true');
        await postToApi('record_visit', {});
    }
};

export const saveFeedback = async (data) => {
    if (typeof window === 'undefined') return;
    
    // Spam check
    const lastSubmit = localStorage.getItem(COOLDOWN_KEY);
    if (lastSubmit && (Date.now() - parseInt(lastSubmit)) < 60000) {
        throw new Error('Please wait 60 seconds before submitting again.');
    }

    const res = await postToApi('save_feedback', data);
    if (res && res.success) {
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
        return res.newEntry;
    }
    throw new Error('Failed to save feedback on server');
};

export const getAllFeedback = async () => {
    if (typeof window === 'undefined') return [];
    const data = await fetchFromApi();
    return data.feedback || [];
};

export const getApprovedFeedback = async () => {
    if (typeof window === 'undefined') return [];
    const feedback = await getAllFeedback();
    return feedback.filter(f => f.status === 'approved');
};

export const updateFeedbackStatus = async (id, status) => {
    if (typeof window === 'undefined') return;
    await postToApi('update_feedback_status', { id, status });
};

export const deleteFeedback = async (id) => {
    if (typeof window === 'undefined') return;
    await postToApi('delete_feedback', { id });
};

export const getAnalytics = async () => {
    if (typeof window === 'undefined') return { visits: 0, totalFeedback: 0, approvedCount: 0, avgRating: 0 };
    
    const data = await fetchFromApi();
    const visits = data.visits || 0;
    const feedback = data.feedback || [];
    const approved = feedback.filter(f => f.status === 'approved');
    
    const totalRating = approved.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = approved.length > 0 ? (totalRating / approved.length).toFixed(1) : 0;

    return {
        visits,
        totalFeedback: feedback.length,
        approvedCount: approved.length,
        avgRating
    };
};

export const saveContactMessage = async (data) => {
    if (typeof window === 'undefined') return;
    const res = await postToApi('save_contact_message', data);
    if (res && res.success) {
        return res.newEntry;
    }
    return null;
};

export const getContactMessages = async () => {
    if (typeof window === 'undefined') return [];
    const data = await fetchFromApi();
    return data.messages || [];
};

export const deleteContactMessage = async (id) => {
    if (typeof window === 'undefined') return;
    await postToApi('delete_contact_message', { id });
};
