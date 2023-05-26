<template></template>


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
    const selectedBoxItems = ref([]);

    function selectLetter(letter) {
      selectedLetter.value = letter;
    }

    function selectBox(index) {
      if (boxItems[index] !== '+') {
        if (selectedBoxItems.value.includes(index)) {
          selectedBoxItems.value = selectedBoxItems.value.filter(i => i !== index);
        } else {
          selectedBoxItems.value.push(index);
        }
      } else if (selectedLetter.value && boxItems[index] === '+') {
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
      selectedBoxItems.value = [];
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

    function discardLetters() {
      selectedBoxItems.value.sort().reverse().forEach(index => {
        boxItems.splice(index, 2);
      });
      selectedBoxItems.value = [];
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
      selectedBoxItems,
      discardLetters
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
  margin: 2px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  color: aliceblue;
  line-height: 30px;
  cursor: pointer;
}

.letter-selected {
  background-color: green;
}


.box {
  display: inline-block;
  margin: 2px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  color: aliceblue;
  line-height: 30px;
  cursor: pointer;
}

.boxletter {
  display: inline-block;
  margin: 2px;
  width: 25px;
  height: 25px;
  border: 1px solid black;
  text-align: center;
  line-height: 25px;
  color: aliceblue;
  background-color: darkblue;
  border-radius: 20%;
  cursor: pointer;
}

.boxletter-selected {
  background-color: green;
}


.small-box {
  display: inline-block;
  margin: 0px;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  color: brown;
  cursor: pointer;
}
</style>









