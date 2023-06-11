//////////////////////////////////////////////
// function Store(reducer) {
//   let state = reducer(undefined, {});
//   let cbs = [];

//   this.getState = function() {
//     return state;
//   }

//   this.subscribe = function(cb) {
//     cbs.push(cb);
//     return function unsubscribe(){
//       cbs = cbs.filter((c) => c !== cb)
//     } 
//   }

//   this.dispatch = function(action) {
//     const newState = reducer(state, action);
//     if (newState !== state) { 
//       state = newState;  
//       for (let cb of cbs)  cb() 
//     }
//   }
// }

//Task 'Store Class'

class Store {
  #reducer;
  #state;
  #cbs = []
  
  constructor(reducer) {
    this.#reducer = reducer;
    this.#state = this.#reducer(undefined, {});
  }
  
  getState() {
    return this.#state;
  }
  
  subscribe(cb) {
    this.#cbs.push(cb);
    return function unsubscribe() {
      this.#cbs = this.#cbs.filter((c) => c !== cb)
    }
  }
  
  dispatch(action) {
    const newState = this.#reducer(this.#state, action);
    if (newState !== this.#state) { 
      this.#state = newState;  
      for (let cb of this.#cbs){
        cb();
      } 
    }       
  }
}

class CreateStore extends Store {
  dispatch(action) {
    console.log(action);
    if (typeof action === 'function'){ 
      return action(this.dispatch.bind(this), this.getState.bind(this)); 
    } else {
      super.dispatch(action);
    } 
  }
}


////////////////////////////////////////
// function Password(parent, open) {
//   let isOpen = open;

//   const input = document.createElement('input');
//   input.placeholder = 'Password';
//   parent.appendChild(input);

//   const toggleButton = document.createElement('button');
//   toggleButton.innerText = isOpen ? 'Hide' : 'Show';
//   input.type = isOpen ? 'text' : 'password';
//   toggleButton.type = 'button';
//   parent.appendChild(toggleButton);

//   function togglePasswordVisibility() {
//     isOpen = !isOpen;
//     input.type = isOpen ? 'text' : 'password';
//     toggleButton.innerText = isOpen ? 'Hide' : 'Show';

//     if (typeof this.onOpenChange === 'function') {
//       this.onOpenChange(isOpen);
//     }
//   }

//   toggleButton.addEventListener('click', togglePasswordVisibility.bind(this));

//   input.addEventListener('input', () => {
//     if (typeof this.onChange === 'function') {
//       this.onChange(input.value);
//     }
//     this.setValue(input.value);
//   });

//   this.setValue = function(value) {
//     input.value = value;
//   };

//   this.getValue = function() {
//     return input.value;
//   };

//   this.setOpen = function(open) {
//     if (isOpen !== open) {
//       togglePasswordVisibility.call(this);
//     }
//   };

//   this.getOpen = function() {
//     return isOpen;
//   };

//   this.setStyle = function(style) {
//     input.setAttribute('style', style);
//   };
// }


//Task 'Password Class'

class Password {
  #isOpen = false;
  #input;
  #toggleButton;

  constructor(parent, open) {
    this.#isOpen = open;

    this.#input = document.createElement('input');
    this.#input.placeholder = 'Password';
    parent.appendChild(this.#input);

    this.#toggleButton = document.createElement('button');
    this.#toggleButton.innerText = this.#isOpen ? 'Hide' : 'Show';
    this.#input.type = this.#isOpen ? 'text' : 'password';
    this.#toggleButton.type = 'button';
    parent.appendChild(this.#toggleButton);

    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.#toggleButton.addEventListener('click', this.togglePasswordVisibility);

    this.#input.addEventListener('input', () => {
      if (typeof this.onChange === 'function') {
        this.onChange(this.#input.value);
      }
      this.setValue(this.#input.value);
    });

    this.setValue = function (value) {
      this.#input.value = value;
    };

    this.getValue = function () {
      return this.#input.value;
    };

    this.setOpen = function (open) {
      if (this.#isOpen !== open) {
        this.togglePasswordVisibility();
      }
    };

    this.getOpen = function () {
      return this.#isOpen;
    };

    this.setStyle = function (style) {
      this.#input.setAttribute('style', style);
    };
  }

  togglePasswordVisibility() {
    this.#isOpen = !this.#isOpen;
    this.#input.type = this.#isOpen ? 'text' : 'password';
    this.#toggleButton.innerText = this.#isOpen ? 'Hide' : 'Show';

    if (typeof this.onChange === 'function') {
      this.onChange(this.#isOpen);
    }
  }
}



// Task 'StoreThunk Class'

class StoreThunk extends Store {
  dispatch(action) {
    console.log(action);
    if (typeof action === 'function'){ 
      return action(this.dispatch.bind(this), this.getState.bind(this)); 
    } else {
      super.dispatch(action);
    } 
  }
}




//Task 'RGB'

class RGB {
  #r
  #g
  #b 

  constructor(r,g,b) {
    this.validateRGBValues(r, g, b);
    this.#r = r;
    this.#g = g;
    this.#b = b;
  }

  get r() {
    return this.#r;
  }

  get g() {
    return this.#g;
  }

  get b() {
    return this.#b;
  }

  set r(value) {
    this.#r = value;
  }

  set g(value) {
    this.#g = value;
  }

  set b(value) {
    this.#b = value;
  }

  get rgb() {
    return `rgb (${this.#r},${this.#g},${this.#b})`
  }

  set rgb(value) {
    const valueOfRgb = value.match(/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
    if (valueOfRgb) {
      const r = parseInt(valueOfRgb[1]);
      const g = parseInt(valueOfRgb[2]);
      const b = parseInt(valueOfRgb[3]);
      this.validateRGBValues(r, g, b);
      this.#r = r;
      this.#g = g;
      this.#b = b;
    } else {
      throw new SyntaxError("Invalid RGB value. Expected format: rgb(0,0,0)");
    }
  }

  get hex() {
    const hexOfR = this.#r.toString(16).padStart(2,'0').toUpperCase();
    const hexOfG = this.#g.toString(16).padStart(2,'0').toUpperCase();
    const hexOfB = this.#b.toString(16).padStart(2, '0').toUpperCase();
    return `hex #${hexOfR}${hexOfG}${hexOfB}`
  }

  set hex(value) {
    const valueOfHex = value.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
    if (valueOfHex) {
      const r = parseInt(valueOfHex[1], 16);
      const g = parseInt(valueOfHex[2], 16);
      const b = parseInt(valueOfHex[3], 16);
      this.validateRGBValues(r, g, b);
      this.#r = r;
      this.#g = g;
      this.#b = b;
    } else {
      throw new SyntaxError("Invalid hex value. Expected format: #RRGGBB");
    }
  }

  

  #validateRGBValue(value) {
    if (typeof value !== "number" || isNaN(value) || value < 0 || value > 255) {
      throw new RangeError("Invalid RGB value. Value must be an integer between 0 and 255.");
    }
  }

  validateRGBValues(r, g, b) {
    this.#validateRGBValue(r);
    this.#validateRGBValue(g);
    this.#validateRGBValue(b);
  }
}

// const rgb = new RGB(15,128,192)
// rgb.r = 15
// rgb.g = 128
// rgb.b = 192
// console.log(rgb.hex) //#0F80C0
// console.log(rgb.rgb) //rgb(15,128,192)
// rgb.hex = '#203040'
// console.log(rgb.rgb) //rgb(32, 48, 64)
// rgb.rgb = 'rgb(100, 90, 50)'
// console.log(rgb.r, rgb.g, rgb.b) //100, 90, 50

// rgb.hex = 'діч' //SyntaxError
// rgb.r   = 1000   //RangeError




// Task 'RGBA Class'
// class RGBA extends RGB {
//   #a;

//   constructor(r, g, b, a) {
//     super(r, g, b); 
//     this.#validateAlphaValue(a);
//     this.#a = a;
//   }

//   get a() {
//     return this.#a;
//   }

//   set a(value) {
//     this.#validateAlphaValue(value);
//     this.#a = value;
//   }

//   get hex() {
//     const hexRGB = super.hex; 
//     const hexA = Math.round(this.#a * 255).toString(16).padStart(2, "0");
//     return `${hexRGB}${hexA}`;
//   }

//   set hex(value) {
//     if (value.length === 7) {
//       super.hex = value; 
//       this.#a = 1;
//     } else if (value.length === 9) {
//       const hexRGB = value.substring(0, 7);
//       const hexA = value.substring(7, 9);
//       super.hex = hexRGB; 
//       this.#a = parseInt(hexA, 16) / 255;
//     } else {
//       throw new SyntaxError("Invalid hex value. Expected format: #RRGGBB or #RRGGBBAA");
//     }
//   }

//   get rgba() {
//     return `rgba(${this.r},${this.g},${this.b},${this.#a})`;
//   }

//   set rgba(value) {
//     const rgbaValues = value.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)$/);
//     if (rgbaValues) {
//       const r = parseInt(rgbaValues[1]);
//       const g = parseInt(rgbaValues[2]);
//       const b = parseInt(rgbaValues[3]);
//       const a = parseFloat(rgbaValues[4]);
//       this.validateRGBValues(r, g, b);
//       this.#validateAlphaValue(a);
//       this.r = r;
//       this.g = g;
//       this.b = b;
//       this.#a = a;
//     } else {
//       throw new SyntaxError("Invalid RGBA value. Expected format: rgba(0,0,0,0.5)");
//     }
//   }

//   set color(value) {
//     if (value.startsWith("#")) {
//       this.hex = value;
//     } else if (value.startsWith("rgba")) {
//       this.rgba = value;
//     } else if (value.startsWith("rgb")) {
//       const rgbValues = value.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
//       if (rgbValues) {
//         const r = parseInt(rgbValues[1]);
//         const g = parseInt(rgbValues[2]);
//         const b = parseInt(rgbValues[3]);
//         this.validateRGBValues(r, g, b);
//         this.r = r;
//         this.g = g;
//         this.b = b;
//         this.#a = 1;
//       } else {
//         throw new SyntaxError("Invalid RGB value. Expected format: rgb(0,0,0)");
//       }
//     } else {
//       throw new SyntaxError("Invalid color value. Expected format: #RRGGBB, #RRGGBBAA, rgb(0,0,0), or rgba(0,0,0,0.5)");
//     }
//   }

//   #validateAlphaValue(value) {
//     if (typeof value !== "number" || isNaN(value) || value < 0 || value > 1) {
//       throw new RangeError("Invalid alpha value. Value must be a number between 0 and 1.");
//     }
//   }
// }

// const rgba = new RGBA(15,128,192,1)
// rgba.hex = '#80808080'
// console.log(rgba.a) //0.5
// console.log(rgba.rgba) //rgba(128,128,128,0.5)
// rgba.r = 192
// rgba.a = 0.25
// console.log(rgba.hex)  //#C0808040

// rgba.color = 'rgba(1,2,3,0.70)'
// rgba.b    *= 10
// console.log(rgba.hex)  //#01021EB3



