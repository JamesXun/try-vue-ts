import { ActionTree, Module, MutationTree } from 'vuex';

const stateObj = {
    list: ['melon'],
};

export interface FoodState {
    list: string[];
}

export interface FoodAction {
    SET_LIST: (data: FoodState['list']) => void;
}

const getters = {
    foodListStr: (state: FoodState): string => state.list.join(),
};

const mutations: MutationTree<FoodState> = {
    SET_LIST(state: FoodState, data: FoodState['list']) {
        state.list = data;
    },
};

const actions: ActionTree<FoodState, any> = {
    SET_LIST({ commit }, data: FoodState['list']) {
        commit('SET_LIST', data);
    },
};

const module: Module<FoodState, any> = {
    state: stateObj,
    getters,
    mutations,
    actions,
};

export default module;
