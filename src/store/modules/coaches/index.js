import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
namespaced: true,
state() {
    return {
        
        lastFetch: null,
        coaches: [{
            id: 'c1',
            firstName: 'Steve',
            lastName: 'Boz',
            areas: ['personal', 'soccer', 'basketball'],
            description:
            "I'm Roger and I have 3 years of hands on experience as a Personal Trainer!",
            hourlyRate: 30
        },
        {
            id: 'c2',
            firstName: 'Julie',
            lastName: 'Moore',
            areas: ['soccer', 'personal'],
            description:
            "I'm Julie and I have 3 years of hands on experience as a Software Engineer!",
            hourlyRate: 30
    }
]
    }
},
mutations,
actions,
getters

}