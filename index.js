(function() {
    /**
     * ARRAY METHODS
     */
    Object.defineProperty(Array.prototype, byIndex, (index) => {
        let midPoint = this.length / 2;
        if (this[midPoint].index < index) {
            return this.byIndex(this.slice(0, midPoint));
        }
        else if (this[midPoint].index > index) {
            return this.byIndex(this.slice(midPoint + 1, this.length));
        }
        else return this[midPoint];
    }); 

    Object.defineProperty(Array.prototype, pushIfAbsent, (value) => {
        if(!this.includes(value)) {
            this.push(value);
            return true;
        }
        return false;
    }); 

    Object.defineProperty(Array.prototype, remove, (value) => {
        const ind = this.indexOf(value);
        if (ind >= 0) {
            this.splice(ind, 1);
            return true;
        }
        return false;
    }); 
    Object.defineProperty(Array.prototype, includesProperty, (propertyVal, propertyName) => {
        for (let i = 0; i < this.length; i++) {
            const prop = this[i][propertyName];
            switch (typeof prop) {
                case "function": 
                    if(prop() == propertyVal) return true;
                    break;
                default: 
                    if(prop == propertyVal) return true;
            }
        }
        return false;
    });

    

    const Gender = {
        MALE: "Male",
        FEMALE: "Female",
        NONBINARY: "Nonbinary"
    }

    const Pronoun = {
        THEY: {
            Male: "he",
            Female: "she",
            Nonbinary: "they"
        },
        THEIR: {
            Male: "his",
            Female: "her",
            Nonbinary: "their"
        },
        THEYRE: {
            Male: "he's",
            Female: "she's",
            Nonbinary: "they're"
        },
        THEIRS: {
            Male: "his",
            Female: "hers",
            Nonbinary: "theirs"
        },
        THEM: {
            Male: "him",
            Female: "her",
            Nonbinary: "them"
        }
    }

    class Map {
        #MapValue;
        #val_array;
        constructor(keys = [], values = []) {
            this.#val_array = []; //Array of MapValues  
            for (let i = 0; i < values.length; i++) {
                this.#val_array.push(new this.#MapValue(values[i], [keys[i]]));
            }

            this.#MapValue = class {
                #value;
                #keys;
                constructor(v = {}, keys = []) {
                    this.#keys = keys;
                    this.#value = v;
                }

                getValue() { return this.#value; }
                getKeys() { return this.#keys; }

                setValue(value) { this.#value = value; }
                addKey(key) { return this.#keys.pushIfAbsent(key); }
                removeKey(key) { return this.#keys.remove(key); }
            }
        }

        add(key, value) {
            if (!this.includesKey(key)) {
                if (!this.includesValue(value)) {
                    this.#val_array.push(new this.#MapValue(value, [key]))
                    return true;
                } 
                this.#val_array[this.#indexOfValue(value)].addKey(key);
                return true;
            }
            return false;
        }

        get(key) {
            const d = this.#indexOfKey(key);
            return d >= 0 ? this.#val_array[d].getValue() : null;
        }

        removeKey(key) {
            const d = this.#indexOfKey(key);
            return d >= 0 ? this.#val_array[d].removeKey(key) : false;
        }

        removeValue(value) {
            const d = this.#indexOfValue(value);
            return d >= 0 ? this.#val_array.remove(this.#val_array[d]) : false;
        }

        includesKey(key) {
            return this.#indexOfKey(key) != -1;
        }

        includesValue(value) {
            return this.#indexOfValue(value) != -1;
        }

        #indexOfValue(value) {
            for (let i = 0; i < this.size(); i++) {
                if (this.#val_array[i].getValue() === value) return i;
            }
            return -1;
        }

        #indexOfKey(key) {
            for (let i = 0; i < this.size(); i++) {
                if (this.#val_array[i].getKeys().includes(key)) return i;
            }
            return -1;
        }

        isEmpty() {
            return this.size() == 0;
        }

        size() {
            return this.#key_array.length;
        }
    }

    function parseText(text) {
        const keyword_functions = {
            //Gender
            their: ({ gender }) => {
                let m = new Map(Object.values(Gender), Object.values(Pronoun.THEIR))
                return m.get(gender);
            },
            they: ({ gender }) => {
                let m = new Map(Object.values(Gender), Object.values(Pronoun.THEY))
                return m.get(gender);
            },
            them: ({ gender }) => {
                let m = new Map(Object.values(Gender), Object.values(Pronoun.THEM))
                return m.get(gender);
            },
            theyre: ({ gender }) => {
                let m = new Map(Object.values(Gender), Object.values(Pronoun.THEYRE))
                return m.get(gender);
            },
            theirs: ({ gender }) => {
                let m = new Map(Object.values(Gender), Object.values(Pronoun.THEIRS))
                return m.get(gender);
            },
        }
    }
})();