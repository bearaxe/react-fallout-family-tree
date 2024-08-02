import Vue from 'vue'
import Vuex from 'vuex'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  updateDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore/lite'
import firebaseConfig from '@/../secrets/firebase.auth'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dwellers: []
  },
  getters: {
    newId: (state) => state.dwellers.length + 1,
    findById: (state) => (id) => { return state.dwellers.find(entry => entry.id == id) || {}; },
  },
  mutations: {
    setDwellers: (state, newDwellerList)=> { state.dwellers = newDwellerList },
    addDweller: (state, newDweller) => { state.dwellers.push(newDweller) },
    removeDweller: (state, deleteDweller) => {
      state.dwellers = state.dwellers.filter(dweller => dweller.id != deleteDweller.id)
    },
    updateDweller: (state, updateData) => {
      const indexOfDweller = state.dwellers.findIndex(dweller => dweller.id == updateData.id);
      state.dwellers[indexOfDweller] = updateData;
    }
  },
  actions: {
    async getDwellers({ commit }) {
      const dwellerCollection = collection(db, 'dwellers')
      const querySnaphot = await getDocs(dwellerCollection)
      // TODO: can probably just set the entire list (careful of that children array)
      const dwellerList = querySnaphot.docs.map((doc) => {
        commit('addDweller', { ...doc.data(), id: doc.id })
        return { ...doc.data(), id: doc.id }
      })
    },
    async saveDweller({ commit, dispatch, getters }, newDweller) {
      try {
        const dwellerRef = doc(collection(db, 'dwellers'));
        await setDoc(dwellerRef, {...newDweller, id: dwellerRef.id})
        console.log("Document written with ID: ", dwellerRef.id);
        commit('addDweller', {...newDweller, id: dwellerRef.id})

        if(newDweller.parent1) {
          const parent1 = getters.findById(newDweller.parent1);
          dispatch('addChildToParent', {
            parentDweller: parent1,
            childDocRef: dwellerRef.id
          })
        }

        if(newDweller.parent2) {
          const parent2 = getters.findById(newDweller.parent2);
          dispatch('addChildToParent', {
            parentDweller: parent2,
            childDocRef: dwellerRef.id
          })
        }

        return dwellerRef.id;
      }
      catch(error) {
        console.error("Error adding document: ", error);
      }
    },
    async deleteDweller({ commit, dispatch, getters }, deleteDweller) {
      const dwellerRef = doc(db, "dwellers", deleteDweller.id)
      await deleteDoc(dwellerRef);
      commit('removeDweller', deleteDweller)

      if(deleteDweller.parent1) {
        const parent1 = getters.findById(deleteDweller.parent1);
        await dispatch('removeChildFromParent', {
          parentDweller: parent1,
          childDocRef: deleteDweller.id
        })
      }

      if(deleteDweller.parent2) {
        const parent2 = getters.findById(deleteDweller.parent2);
        await dispatch('removeChildFromParent', {
          parentDweller: parent2,
          childDocRef: deleteDweller.id
        })
      }
    },
    async addChildToParent({ dispatch }, { parentDweller, childDocRef }) {
      const parentChildren = parentDweller.children || [];
      await dispatch('updateDweller', {
        ...parentDweller,
        children: [
          ...parentChildren,
          childDocRef
        ]
      })
    },
    async removeChildFromParent({ dispatch }, { parentDweller, childDocRef }) {
      const parentChildren = parentDweller.children.filter(childId => childId != childDocRef);
      await dispatch('updateDweller', {
        ...parentDweller,
        children: parentChildren,
      })
    },
    async updateDweller({ commit }, newDwellerData) {
      const docToUpdate = doc(db, 'dwellers', newDwellerData.id);
      await updateDoc(docToUpdate, newDwellerData);
      commit('updateDweller', newDwellerData);
    }
  },
})
