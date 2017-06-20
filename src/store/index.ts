// import { createStore, compose } from 'redux';
// import reducer from './actions';
// import { StoreState } from '../types/index'; // why index?

// export default function configureStore() {
//     const middlewares = compose(
//         (
//             typeof window !== 'undefined' &&
//             typeof window.devToolsExtension !== 'undefined'
//         ) ?
//             window.devToolsExtension() :
//             f => f
//     );

//     const rootReducer = reducer; //combineReducers({ user });

//     const store = createStore<StoreState>(
//         rootReducer,
//         middlewares
//     );

//     return store;
// }
