class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    throwFn()  {
        throw new Error('aue')
    }
    constructor(config) {
        // console.log(config)
        if(config===undefined) throw this.throwFn()
        this.state = this.ini_state = config.initial;
        this.states = config.states    
        this.history = []
        this.history_pointer=0;
        this.queue = {}

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state
    }

    /**
     * Goes to specified state.
     * @param state
     */


    changeState(new_state) {
        if(this.states[new_state] !== undefined){
            if(this.history[0]===undefined){
                this.history_pointer++
                this.history.push(this.state)
            }
            else if(this.history[this.history_pointer]!==this.state ){
                    this.history_pointer++
                    this.history.push(this.state)
            }
            //  else if(this.history_pointer === -1){
            //     this.history_pointer++
            //  }
            this.state=new_state;
        }
        else{
            throw this.throwFn()
        }
 
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event){
        
        if(this.states[this.state].transitions[event] !==undefined){
            
            if(this.history[0]===undefined){
                this.history_pointer++
                this.history.push(this.state)
            }
            else if(this.history[this.history_pointer]!==this.state ){
                    this.history_pointer++
                    this.history.push(this.state)
            }
            else if(this.history[this.history_pointer-1]!==this.states[this.state].transitions[event]){
                    this.history=this.history.slice(0,this.history_pointer+1)
                    this.history_pointer++
            }
            // else if(this.history[this.history_pointer]!==this.state ){
            //     this.history_pointer++
            //     this.history.push(this.state)
            // }
            // this.history_pointer++
            // if(this.history.length===this.history_pointer)
            this.state = this.states[this.state].transitions[event];
            // else  if(this.history[this.history_pointer]!==this.state ){
            //     this.history_pointer++
            //     this.history.push(this.state)
            //  }
            //  else if(this.history_pointer === -1){
            //     this.history_pointer++
            //  }
            
            
            
        }        
        else{
            throw this.throwFn()
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset(){
        this.state = this.ini_state
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event){
        let states_array = Object.keys(this.states)
        let states=[]
        if(event===undefined){
            return states_array
        }
        for(let i=0;i< states_array.length;i++){
            let candidate = this.states[states_array[i]].transitions[event]
            
            debugger
            if(candidate!==undefined){
                states.push(states_array[i])
            }
        }
        return states
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo(){
        if(this.history_pointer===0 ||

            this.history[0]===undefined){
            return false
        }
        // if(this.history_pointer<0 ||

        //     this.history[0]===undefined){
        //     return false
        // }
        this.history[this.history_pointer]=this.state;
        this.history_pointer--;
        this.state=this.history[this.history_pointer];
        
        return true
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo(){
        
        if(this.history[0]===undefined || this.history[this.history_pointer+1]===undefined){
            return false
        }
        this.history_pointer++
        this.state=this.history[this.history_pointer]
        return true
    }

    /**
     * Clears transition history
     */
    clearHistory(){
        this.history_pointer=0;
        this.history=[];
    }
}

module.exports = FSM;

    const config = {
        initial: 'normal',
        states: {
            normal: {
                transitions: {
                    study: 'busy',
                }
            },
            busy: {
                transitions: {
                    get_tired: 'sleeping',
                    get_hungry: 'hungry',
                }
            },
            hungry: {
                transitions: {
                    eat: 'normal'
                },
            },
            sleeping: {
                transitions: {
                    get_hungry: 'hungry',
                    get_up: 'normal',
                },
            },
        }
    };
    // const student = new FSM(config)
    //  debugger

    //  student.trigger('study');
    //         student.undo();
    //         student.redo();
    //         student.redo();
    //         student.trigger('study');
    //         student.redo();
    //  expect(student.getState()).to.equal('busy');
    // // expect(student.getState()).to.equal('busy');

/** @Created by Uladzimir Halushka **/
