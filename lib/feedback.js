// lib/feedback.js

const FEEDBACK_KEY = 'digibday_feedback';
const VISITS_KEY = 'digibday_visits';
const COOLDOWN_KEY = 'digibday_feedback_cooldown';
const MESSAGES_KEY = 'digibday_contact_messages';

export const recordVisit = () => {
    if (typeof window === 'undefined') return;
    const currentVisits = parseInt(localStorage.getItem(VISITS_KEY) || '0');
    localStorage.setItem(VISITS_KEY, (currentVisits + 1).toString());
};

export const saveFeedback = (data) => {
    if (typeof window === 'undefined') return;
    
    // Spam check
    const lastSubmit = localStorage.getItem(COOLDOWN_KEY);
    if (lastSubmit && (Date.now() - parseInt(lastSubmit)) < 60000) {
        throw new Error('Please wait 60 seconds before submitting again.');
    }

    const feedback = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
    const newEntry = {
        id: Date.now().toString(),
        name: data.name || 'Anonymous',
        message: data.message,
        rating: data.rating,
        status: 'pending',
        timestamp: new Date().toISOString()
    };

    feedback.push(newEntry);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedback));
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
    return newEntry;
};

export const getAllFeedback = () => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
};

export const getApprovedFeedback = () => {
    if (typeof window === 'undefined') return [];
    const feedback = getAllFeedback();
    return feedback.filter(f => f.status === 'approved');
};

export const updateFeedbackStatus = (id, status) => {
    if (typeof window === 'undefined') return;
    const feedback = getAllFeedback();
    const index = feedback.findIndex(f => f.id === id);
    if (index !== -1) {
        feedback[index].status = status;
        localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedback));
    }
};

export const deleteFeedback = (id) => {
    if (typeof window === 'undefined') return;
    const feedback = getAllFeedback();
    const filtered = feedback.filter(f => f.id !== id);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(filtered));
};

export const getAnalytics = () => {
    if (typeof window === 'undefined') return { visits: 0, totalFeedback: 0, avgRating: 0 };
    
    const visits = parseInt(localStorage.getItem(VISITS_KEY) || '0');
    const feedback = getAllFeedback();
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

export const saveContactMessage = (data) => {
    if (typeof window === 'undefined') return;
    const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
    const newEntry = {
        id: Date.now().toString(),
        name: data.name || 'Anonymous',
        email: data.email,
        message: data.message,
        timestamp: new Date().toISOString()
    };
    messages.push(newEntry);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    return newEntry;
};

export const getContactMessages = () => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
};

export const deleteContactMessage = (id) => {
    if (typeof window === 'undefined') return;
    const messages = getContactMessages();
    const filtered = messages.filter(m => m.id !== id);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(filtered));
};
