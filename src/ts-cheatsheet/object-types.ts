function objectTypesMain(){
    interface Person {
        name: string;
        age: number;
    }

    type Member = {
        name: string;
        age: number;
    }

    function greet(person: Person | Member) {
        return "Hello " + person.name;
    }

    console.log(greet({name: 'Any', age: 30}))

    enum Shape {
        Circle,
        Rectangle,
        Square
    }

    interface PaintOptions {
        shape: Shape;
        xPos?: number;
        yPos?: number;
    }

    function paintShape({shape,xPos, yPos}: PaintOptions) {
        // ...
        console.log(shape, xPos||=0, yPos||=0);
    }
       
    const shape = Shape.Rectangle
    paintShape({ shape });
    paintShape({ shape, xPos: 100 });
    paintShape({ shape, yPos: 100 });
    paintShape({ shape, xPos: 100, yPos: 100 });    

    interface ReadonlyPerson {
        readonly name: string;
        readonly age: number;
    }

    const writablePerson: Person = {
        name: "Person McPersonface",
        age: 42,
    };

    // works
    const readonlyPerson: ReadonlyPerson = writablePerson;

    console.log(readonlyPerson.age); // prints '42'
    writablePerson.age++;
    console.log(readonlyPerson.age); // prints '43' 

    // Index signatures
    interface CustomObject {
        [index: string]: string
    }
    const customObj : CustomObject = {};
    customObj[1] = '1';
    customObj['tada'] = 'tdo';
    console.log(customObj);
    // Extending Types
    interface BasicAddress {
        name?: string;
        street: string;
        city: string;
        country: string;
        postalCode: string;
      }
       
    interface AddressWithUnit extends BasicAddress {
        unit?: string;
    }
    
    const addr : AddressWithUnit = {
        name: 'A1',
        street: 'Tran Quoc Toan',
        city: 'Ho Chi Minh',
        country: 'Viet Nam',
        postalCode: '76000',
        unit: 'block'
    };

    console.log(addr);
}

objectTypesMain();