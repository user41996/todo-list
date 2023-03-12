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
                <div>
                    <ul>
                        <li v-for="note in forBegin"><p>{{note.name}}</p>
                            <ul>
                                <li v-for="task in note.points" v-if="task.name !== null"">

                                <p >{{task.name}}</p>
                                <input type="checkbox">

                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

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
            forBegin:[],//массив, в котором будут лежать только что созданные карточки
            inProgress:[],//массив, в котором будут лежать карточки, у которых достигнута отметка в 50%
            final:[],//массив, в котором будут лежать выполненные карточки
            errors:[],//массив с ошибками для валидации полей формы
        }
    },
    methods:{

    },
    mounted(){  //здесь при нажатии должно пушить в массив переменную, которую я перенёс из другого компонента
        eventBus.$on('onSubmit',note => { //подписываемся на событие нажатия кнопки в форме
            this.forBegin.push(note); //пушит, теперь надо вывести
            console.log(this.forBegin);
        })
    }

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
            errors:[]//массив который будет работать с ошибками при заполнении формы
        }
    },
    methods:{
        //при нажатии на кнопку...
        onSubmit(){
            //если имя задачи, первый, второй и третий пункты не пустые, то ...
            if(this.nameOfTask && this.firstPoint && this.secondPoint && this.thirdPoint){
                //в переменную note записывается...
                let note = {
                    name: this.nameOfTask, //...имя задачи, которое равно введённому имени
                    points: [ //...массив с пунктами для выполнения задачи...
                        {name: this.firstPoint},//... в котром по пунктно записывается
                        {name: this.secondPoint},
                        {name: this.thirdPoint},
                        {name: this.forthPoint},
                        {name: this.fifthPoint},
                    ],
                }
                console.log(note);
                eventBus.$emit('onSubmit', note);//здесь должна вызывать функция(метод который должен быть описан выше) которая произведёт запись в другое место, откуда уже данные будут обрабатываться
                this.nameOfTask = null;//после чего все значения обнуляются чтобы избежать дублирования данных
                this.firstPoint = null;
                this.secondPoint = null;
                this.thirdPoint = null;
                this.forthPoint = null;
                this.fifthPoint = null;
                console.log(note);
            }
            //во всех других случаях...
            else{
                if(!this.nameOfTask) this.errors.push("Name of task required"); //если имя пустое,то в массив с ощибками добваится строка "Имя обязательно"
                if(!this.firstPoint) this.errors.push("First point required"); //По аналогии с именем тоже самое и для первых трёх пунктов, которые по заданию обязательные
                if(!this.secondPoint) this.errors.push("Second point required"); 
                if(!this.thirdPoint) this.errors.push("Third point required"); 
            }
        },

    },

})

//подключаем приложение заранее
let app = new Vue({
    el:'#app'
});