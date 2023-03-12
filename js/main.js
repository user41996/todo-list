//подключаем автобус заранее
let eventBus = new Vue();

// Компонент
Vue.component('note-list',{
    template:`
    
    <div class="note-list">
    
    <create-task></create-task>

    <div class="ticket">

            <p>Name:</p>
            <span>
                <label>Первый шаг:</label>
                <input type="checkbox">
            </span>

            <span>
                <label>Второй шаг:</label>
                <input type="checkbox">
            </span>

            <span>
                <label>Третий шаг:</label>
                <input type="checkbox">
            </span>

            <span>
                <label>Четвёртый шаг:</label>
                <input type="checkbox">
            </span>

            <span>
                <label>Пятый шаг:</label>
                <input type="checkbox">
            </span>

        </div>

        <div class="columns">

            <div class="for-begin">
                <h2>Your tasks in begin:</h2>
            </div>

            <div class="in-progress">
                <h2>Your tasks in progress:</h2>
            </div>

            <div class="final">
                <h2>Your complete tasks:</h2>
            </div>

        </div>

    </div>
    `,
    data(){
        return{

        }
    },
    methods:{

    },

})

//компонент для формы
Vue.component('create-task',{
    template:`
    <form class="create-task" @submit.prevent="onSubmit">

        <span>
            <label for="nameOfTask">Enter the name for your task:</label>
            <input type="text" placeholder="Name of your task" required v-model="nameOfTask">
        </span>
        <br>

        <span>
            <label for="firstPoint">Enter the first point your task:</label>
            <input type="text" placeholder="First point of your task" required v-model="firstPoint">
        </span>
        <br>

        <span>
            <label for="secondPoint">Enter the second point your task:</label>
            <input type="text" placeholder="Second point of your task" required v-model="secondPoint">
        </span>
        <br>

        <span>
            <label for="thirdPoint">Enter the third point your task:</label>
            <input type="text" placeholder="Third point of your task" required v-model="thirdPoint">
        </span>
        <br>

        <span>
            <label for="forthPoint">Enter the forth point your task:</label>
            <input type="text" placeholder="Fourth point of your task" v-model="forthPoint">
        </span>
        <br>

        <span>
            <label for="fifthPoint">Enter the fifth point your task:</label>
            <input type="text" placeholder="Fifth point of your task" v-model="fifthPoint">
        </span>
        <br>

        <button type="submit">Create task</button>

    </form>
    `,
    data(){
        return{
            nameOfTask: null, //имя задачи(карточки)
            firstPoint: null, //первый пункт карточки
            secondPoint: null, //второй пункт карточки
            thirdPoint: null, //третий пункт карточки
            forthPoint: null, //четвёртый пункт карточки 
            fifthPoint: null, //пятый пункт карочки
        }
    },
    methods:{

    },

})

//подключаем приложение заранее
let app = new Vue({
    el:'#app'
});