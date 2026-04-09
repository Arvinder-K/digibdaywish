// lib/feedback.js

export const fetchData = async () => {
    try {
        const res = await fetch('/api/data', { cache: 'no-store' });
        return await res.json();
    } catch (err) {
        console.error("Error fetching data:", err);
        return { feedback: [], messages: [], visits: 0 };
    }
};

const updateData = async (payload) => {
    try {
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        console.error("Error updating data:", err);
    }
};

export const recordVisit = async () => {
    const data = await fetchData();
    await updateData({ visits: (data.visits || 0) + 1 });
};

export const saveFeedback = async (newData) => {
    const COOLDOWN_KEY = 'digibday_feedback_cooldown';
    const lastSubmit = typeof window !== 'undefined' ? localStorage.getItem(COOLDOWN_KEY) : null;
    
    // Minimal spam check locally
    if (lastSubmit && (Date.now() - parseInt(lastSubmit)) < 60000) {
        throw new Error('Please wait 60 seconds before submitting again.');
    }

    const data = await fetchData();
    const newEntry = {
        id: Date.now().toString(),
        name: newData.name || 'Anonymous',
        message: newData.message,
        rating: newData.rating,
        status: 'pending',
        timestamp: new Date().toISOString()
    };

    const newFeedbackList = [...(data.feedback || []), newEntry];
    await updateData({ feedback: newFeedbackList });
    
    if (typeof window !== 'undefined') {
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
    }
    return newEntry;
};

export const getAllFeedback = async () => {
    const data = await fetchData();
    return data.feedback || [];
};

export const getApprovedFeedback = async () => {
    const data = await fetchData();
    const feedback = data.feedback || [];
    return feedback.filter(f => f.status === 'approved');
};

export const updateFeedbackStatus = async (id, status) => {
    const data = await fetchData();
    const feedback = data.feedback || [];
    const index = feedback.findIndex(f => f.id === id);
    if (index !== -1) {
        feedback[index].status = status;
        await updateData({ feedback });
    }
};

export const deleteFeedback = async (id) => {
    const data = await fetchData();
    const feedback = data.feedback || [];
    const filtered = feedback.filter(f => f.id !== id);
    await updateData({ feedback: filtered });
};

export const getAnalytics = async () => {
    const data = await fetchData();
    const feedback = data.feedback || [];
    const approved = feedback.filter(f => f.status === 'approved');
    
    const totalRating = approved.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = approved.length > 0 ? (totalRating / approved.length).toFixed(1) : 0;

    return {
        visits: data.visits || 0,
        totalFeedback: feedback.length,
        approvedCount: approved.length,
        avgRating
    };
};

export const saveContactMessage = async (msgData) => {
    const data = await fetchData();
    const newEntry = {
        id: Date.now().toString(),
        name: msgData.name || 'Anonymous',
        email: msgData.email,
        message: msgData.message,
        timestamp: new Date().toISOString()
    };
    const newMessages = [...(data.messages || []), newEntry];
    await updateData({ messages: newMessages });
    return newEntry;
};

export const getContactMessages = async () => {
    const data = await fetchData();
    return data.messages || [];
};

export const deleteContactMessage = async (id) => {
    const data = await fetchData();
    const messages = data.messages || [];
    const filtered = messages.filter(m => m.id !== id);
    await updateData({ messages: filtered });
};
