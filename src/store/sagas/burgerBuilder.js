import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
//import { delay } from 'redux-saga';
import axios from 'axios';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://my-react-burger-2bb36.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data));
    }
    catch (error) {
        yield put(actions.fetchIngredientsFailed())
    }
}