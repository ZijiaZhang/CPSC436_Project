export const increment = (amount: number) => {
    return {
        type: 'INCREMENT_COUNTER',
        increment: amount
    };
};

