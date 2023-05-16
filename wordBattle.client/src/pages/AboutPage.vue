<template>
  <div class="about">
    <div class="letters">
      <div class="letter" @click="selectLetter(letter)" v-for="letter in letters" :key="letter" :id="letter">{{ letter }}
      </div>
    </div>

    <div class="boxes">
      <template v-for="(item, index) in boxItems" :key="`${item}-${index}`">
        <div class="box" @click="selectBox(index)" v-if="item === '+'">+</div>
        <div class="boxletter" v-else>{{ item }}</div>
      </template>
    </div>

    <button @click="reset">Reset</button>

    <input type="text" v-model="newWordInput" placeholder="Enter new word">
    <button @click="updateWord">Enter</button>
    <button @click="saveWord">Save</button>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';

export default {
  setup() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const selectedLetter = ref(null);
    const newWordInput = ref('');

    const boxItems = reactive([
      '+', 'Y', '+', 'X', '+', 'W', '+', 'V', '+', 'Z', '+',
    ]);

    const lastUpdatedBoxItems = ref([...boxItems]);

    function selectLetter(letter) {
      selectedLetter.value = letter;
    }

    function selectBox(index) {
      if (selectedLetter.value && boxItems[index] === '+') {
        boxItems.splice(index, 1, selectedLetter.value);
        boxItems.splice(index + 1, 0, '+');
        boxItems.splice(index - 0, 0, '+');
        letters.splice(letters.indexOf(selectedLetter.value), 1);
        selectedLetter.value = null;
      }
    }

    function reset() {
      boxItems.splice(0, boxItems.length, ...lastUpdatedBoxItems.value);
      letters.splice(0, letters.length, ...['A', 'B', 'C', 'D', 'E', 'F', 'G']);
      selectedLetter.value = null;
    }

    function updateWord() {
      reset();
      const newWord = newWordInput.value.toUpperCase();
      const boxLetters = boxItems.filter(item => item !== '+');

      if (newWord.length === boxLetters.length) {
        let newIndex = 0;
        for (let i = 0; i < boxItems.length; i++) {
          if (boxItems[i] !== '+') {
            boxItems.splice(i, 1, newWord[newIndex]);
            newIndex++;
          }
        }
        newWordInput.value = '';

        lastUpdatedBoxItems.value = [...boxItems];
      } else {
        alert(`Please enter a ${boxLetters.length}-letter word`);
      }
    }

    function saveWord() {
      const word = boxItems.filter(item => item !== '+').join('');
      console.log(word);
    }

    return {
      letters,
      selectedLetter,
      newWordInput,
      boxItems,
      selectLetter,
      selectBox,
      reset,
      updateWord,
      saveWord,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}

.letters {
  margin-bottom: 20px;
}

.letter {
  display: inline-block;
  margin: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}


.box {
  display: inline-block;
  margin: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.boxletter {
  display: inline-block;
  margin: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  line-height: 30px;

}

.empty-box {
  display: inline-block;
  margin: 0px;
  width: 5px;
  height: 5px;
  border: 1px solid black;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
</style>








