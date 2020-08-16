import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
                // Now the reason why we supplied this initial feedback is that we can reset the form to its initial state after submitting the form. So, in that case, recall that even if you reload your component your form state will remain as such. So, when you submit the form, you want to reset the form.
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}