//подключаем автобус заранее
let eventBus = new Vue();

// Компонент
Vue.component('note-list',{
    props:{ //обеспечиваем доступ компонента к...
      note:{ //...объекту note, который находится в другом компоненте...
          name:{//у которого даём доступ к свойству name
              type: Text,
              required: true,
          },
          points: { //и к массиву
              type: Array,
              required: true,
              name:{
                type: Text,
                default: null,
                required: true
              },
              checked:{
                  type: Boolean,
                  default:false,
                  required: true,
              }
          },
          status: {//и к переменной, которая считает кол-во отмеченных
              type: Number,
              required: true,
          },
      },

    },
    template:`
    
    <div class="note-list">
    
    <create-task></create-task>

    <div class="columns">
            
            <div class="for-begin">

                <h2>Your tasks in begin:</h2>
                <div v-if="inProgress.length != 5 ">
                    <ul>
                        <li v-for="(note, index) in forBegin" class="task-border"><p>Name of task: {{note.name}}</p><br>
                            <ul>
                                <li v-for="(task, mark) in note.points" v-if="task.name !== null"">

                                <p @click="changeStatus(note, task)" :class="{checked: task.checked}">Step: {{task.name}}</p>
                               
                                </li>
                            </ul>
                            <form @submit.prevent = "addStep">
                                <span>
                                    <label>Your new step: </label>
                                    <input type="text" placeholder="New step" required v-model="newPoint">
                                    <input class="add" type="submit" value="Add step" @click="addStep(index)">
                                </span>
                            </form>
                        </li>
                        
                    </ul>
                </div>
                
                <div v-if="inProgress.length === 5" :class="firstDisabled">
                    <ul>
                        <li v-for="note in forBegin" class="task-border"><p>Name of task: {{note.name}}</p><br>
                            <ul>
                                <li v-for="task in note.points" v-if="task.name !== null"">
                                    <p>Step: {{task.name}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="in-progress">
                <h2>Your tasks in progress:</h2>
                <div>
                    <ul>
                        <li v-for="note in inProgress" class="task-border"><p>Name of task: {{note.name}}</p><br>
                            <ul>
                                <li v-for="task in note.points" v-if="task.name !== null"">

                                <p @click="secondChangeStatus(note,task)" :class="{checked: task.checked}">Step: {{task.name}}</p>

                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="final">
                <h2>Your complete tasks:</h2>
                <div>
                    <ul>
                        <li v-for="note in final" class="task-border"><p>Name of task: {{note.name}}</p><br>
                            <ul>
                                <li v-for="task in note.points" v-if="task.name !== null"">
                                <p>Step: {{task.name}}</p>
                                </li>
                                <p>{{ note.date }}</p>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

    </div>

    </div>
    `,
    data(){
        return{
            forBegin:[],//массив, в котором будут лежать только что созданные карточки
            inProgress:[],//массив, в котором будут лежать карточки c достигнутой отметкой в 50%
            final:[],//массив, в котором будут лежать выполненные карточки
            errors:[],//массив с ошибками для валидации полей формы
            newPoint:null,//для добавления новых пунктов


        }
    },
    methods:{
        //методы, которые сохраняют созданные карточки
        localSaveFirstColumn(){
            localStorage.setItem('forBegin', JSON.stringify(this.forBegin));//setItem собирает и локально сохраняет данные, в '' ключ, чтобы метод знал, что сохранять, а JSON.stringify возвращает json-строку
        },
        localSaveSecondColumn(){
            localStorage.setItem('inProgress', JSON.stringify(this.inProgress));//setItem локально сохраняет данные, в '' ключ, чтобы метод знал, что сохранять, а JSON.stringify возвращает json-строку
        },
        localSaveThirdColumn(){
            localStorage.setItem('final', JSON.stringify(this.final));//setItem локально сохраняет данные, в '' ключ, чтобы метод знал, что сохранять, а JSON.stringify возвращает json-строку
        },

        //методы для перехода карточки между колонками
        changeStatus(note,task){
            task.checked = true; //при нажатии должен отмечать поле checked как true
            let count = 0; //переменная для подсчёта ВСЕХ элементов
            note.status = 0; //для подсчёта отмеченных пунктов

            //цикл, который считает все пункты
            for(let i = 0;i < 5; i++){
                if(note.points[i].name !== null){
                    count += 1;
                };
            }

            //цикл, который считает отмеченные пункты
            for(let i = 0; i < count; i++){
                if (note.points[i].checked === true){
                    note.status += 1;
                }
            }

            //если отмеченные поделить на все пункты и умножить на 100,а это больше 50(в процентах), тогда должен запушить такую задачу во второй массив
            if( ((note.status/count) * 100) >= 50 && this.inProgress.length !== 5){
                note.percent = (note.status/count) * 100;
                this.inProgress.push(note) //пушит в массив второго столбца карточку, но без сохранения отметок
                this.forBegin.splice(this.forBegin.indexOf(note), 1);//вырезает первый найденный note
            }
            else if(this.inProgress.length === 5){
                alert('In progress have a max number of tasks')//если пытаться запушить в 2 колонку шестую задачу, получим сообщение
            }
            this.localSaveSecondColumn();//вызывает метод локального сохранения столбца
        },

        secondChangeStatus(note,task){
            task.checked = true;
            let count = 0;
            note.status = 0;

            for(let i = 0; i < 5;i++){
                if(note.points[i].name !== null){
                    count += 1;
                }
            }

            for(let i = 0; i < count; i++){
                if (note.points[i].checked === true){
                    note.status += 1;
                }
            }

            if(((note.status / count) * 100) === 100){
                this.final.push(note);//добавляем в последний столбец
                this.inProgress.splice(this.inProgress.indexOf(note), 1);////вырезает первый найденный note начиная с 1 индекса
                note.date = new Date(); //функция, которая вернёт нам время последнего действия
            }
            this.localSaveThirdColumn();//вызывает метод локального сохранения столбца
        },

        // передай сюда индекс после нажатия кнопки формы для добавления шагов
        // через событие передать через пропсы данные
        addStep(index){
                console.log(index);//поймал индекс карточки, теперь нужно запушить в массив points,который внутри объекта note,
            }
        }

    ,

    mounted(){  //здесь при нажатии должно пушить в массив переменную, которую я перенёс из другого компонента

        this.forBegin = JSON.parse(localStorage.getItem("forBegin")) || [];//json.parse - разбирает первое передаваемое значение на строку,getItem берёт по ключу то, что сохранил setItem,если не может преобразовать возвращает массив
        this.inProgress = JSON.parse(localStorage.getItem("inProgress")) || [];//json.parse - разбирает первое передаваемое значение на строку,getItem берёт по ключу то, что сохранил setItem,если не может преобразовать возвращает массив
        this.final = JSON.parse(localStorage.getItem("final")) || [];//json.parse - разбирает первое передаваемое значение на строку,getItem берёт по ключу то, что сохранил setItem,если не может преобразовать возвращает массив

        eventBus.$on('onSubmit',note => { //подписываемся на событие нажатия кнопки в форме

            if(this.forBegin.length < 3){ //логика добавления в первый столбец
                this.forBegin.push(note);//если в первом столбце меньше 3 карточек, тогда добавляем
                this.localSaveFirstColumn();//вызывает метод локального сохранения столбца
            }
            else{
                this.errors.push('Maximum number of cards!')//если пытаемся запушить 4 карточку, то она не добавляется и в ошибку добавляется сообщение о том, что в столбце максимальное количество карточек
                alert('Maximum number of cards!');
            }
        })
        //посмотри сюда!!!!!
        eventBus.$on('addStep', index => {

        })
    },

    watch: {//обеспечивает ленивый доступ к побочным событиям
        forBegin(newValue) {//метод для сохранения первого столбца
            localStorage.setItem("forBegin", JSON.stringify(newValue));//setItem - собирает массив forBegin, JSON.stringify возвращает json-строку
        },
        inProgress(newValue) {//метод для сохранения второго столбца
            localStorage.setItem("inProgress", JSON.stringify(newValue));//setItem - собирает массив forBegin, JSON.stringify возвращает json-строку
        },
        final(newValue) {//метод для сохранения третьего столбца
            localStorage.setItem("final", JSON.stringify(newValue));//setItem - собирает массив forBegin, JSON.stringify возвращает json-строку
        }
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
            fifthPoint: null, //пятый пункт карточки
            errors:[]//массив, который будет работать с ошибками при заполнении формы
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
                        {name: this.firstPoint, checked: false},//... в котором по пунктно записывается
                        {name: this.secondPoint, checked: false},//checked false = по умолчанию пункт считается неотмеченным
                        {name: this.thirdPoint, checked: false},
                        {name: this.forthPoint, checked: false},
                        {name: this.fifthPoint, checked: false},
                    ],
                    date: null, //для добавления времени в конце того, как карточка перейдёт в 3 колонку
                    status:0, // для подсчёта всех отмеченных пунктов, чтобы обеспечить переход между колонками при 50% выполненных пунктов
                }
                eventBus.$emit('onSubmit', note);//здесь должна вызывать функция(метод, который должен быть описан выше) которая произведёт запись в другое место, откуда уже данные будут обрабатываться
                this.nameOfTask = null;//после чего все значения обнуляются, чтобы избежать дублирования данных
                this.firstPoint = null;
                this.secondPoint = null;
                this.thirdPoint = null;
                this.forthPoint = null;
                this.fifthPoint = null;
            }
            //во всех других случаях.../
            else{
                if(!this.nameOfTask) this.errors.push("Name of task required"); //если имя пустое,то в массив с ошибками добавится строка "Имя обязательно"
                if(!this.firstPoint) this.errors.push("First point required"); //По аналогии с именем тоже самое и для первых трёх пунктов, которые по заданию обязательные
                if(!this.secondPoint) this.errors.push("Second point required");
                if(!this.thirdPoint) this.errors.push("Third point required");
            }
        },

    },

})

//подключаем приложение заранее
let app = new Vue({
    el:'#app',
    data:{

    },
    methods:{
        addTask(){

        }
    }
});