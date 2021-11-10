(function() {
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
})();