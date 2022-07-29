# Framework for Vue 3 using SQL databases. Using typescript programming with out web programming.
# I'm a old FOX with a lot of desing and program eperience in SQL DATABASE. 
# This Framework is based in functions and instruccions of VFP.

# This Framework use:
  - Vue 3 with SFC
  - Vite
  - Native HTML components 
  - Backend with Node express and  VFPnode proyect (soon in github)
  - SQL Data Base (Postgres or MSSQL)
  

# Objetive:
  - Make a simple program in typescript, but with out knowledge of web programming (HTML, CSS, VUE)

## Recommended IDE Setup
- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar).
npm run dev

##  Project mannager
vue ui

## Notes:
  - If you are a VFP programer, cliper, dbase III or IV, this is the right option for programing in web. 

## web components
- Form   
- editText 
- textLabel
- comboBox 
- grid
- optionGroup

## typescript components
- Form (componet container)
- Component
  Each component have serveral properties where each properties afect  visual and database behaviour as values to.
  
   prop = {
    BaseClass: "editText",  // HTML base class (Form, editText, comboBox, sppiner, grid ...)
    Type 'text', //  data types :
                    - number
                    - text
                    - date
                    - spinner.
 
    Name: "", // Name  of component.
    textLabel: "", // text label showing before input.
    ToolTipText: 'Principal name ',.
    Value: '', // Value of component . 

    //  Visual properties.
    Visible: true,. 
    ReadOnly: false,.
    Disabled: false,.
    Placeholder: "",.
    ErrorMessage: "", .
    Format: "",.
    InputMask: "",.
    MaxLenght: 0, .
    TabIndex: 0,.
    Autofocus: false, // component who receives a focus when new register is inserted .
    Position: 'main', // main, header , footer.
    Image: '',.
 
    // Data Base properties.
    ControlSource: "tableName.fieldName, // Name of sql field.
    RecordSource: 'tableName',.
    
    // Internal properties.
    Valid: false, // internal use.
    Sw_cap: true,.
    Key: 0,.         
    id: 0,.
    Status: "I", //  P)rocess, A)ctive , I)nitialization.
    Grid: false,.
    Focus: false,.
    First: false,.
    Last: false,.

    // Numeric components.
    Step: "1",.
    Min: "0",.
    Max: "999999999",
    Style: 'decimal', // decimal, currency,percent,unit.
    Currency: 'MXN', //USD,EUR,MXN.
    CurrencyDisplay : 'code', //to use the ISO currency code.
    Decimals : 2,.


    // Combo box properties .  
    RowSourceType: 0, // How to fill 1-Value, 2-Alias, 5-Array.
    ColumnCount: 1,  // Column numbers.
    BoundColumn: 1,  // The value is atached to column.
    RowSource: {},   // .
    ColumnWidths: '100','20', .
    Row: 0,.
    Map: "",.

   // Others
    Tag: "",.
 


  };
  ## Component Style  .
  estilo = {.
    display: "inline-block",.
    flexGrow: "0",     /* do not grow   - initial value: 0 */.
    flexShrink: "0",   /* do not shrink - initial value: 1 */.
    flexBasis: "auto", /* width/height  - initial value: auto */.
    flexWrap: "wrap",.

    background: "white",.
    color: "#b94295",.
    width: "auto",.
    maxWidth: "auto",.
    minWidth: "auto",.
    height: "auto",.
    fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello).
    fontFamily: "Arial",.
    zIndex: 100,  // profundidad.
    alignContent: "center",.
    textAlign: "left",.

    ....... serveral .

  };.


- Grid (componet container). This component is for table data base capture
 
  A grid have a several columns where each column is a input or label  component where each component if bind to a SQL table field .


## For a complete example, check in views directory. Each directory is a Vue View Page. Check come9101. This is the SQL database maintennce dicctionary, you can add tables with fields, index and SQL views for manipulate data access. 
 
   This have a 2 principal files, a view VUE (Main.vue) and typescript program (ThisForm.ts)
   ThisForm.tx is the begin typesccript program where is a component definition .

   Each component has a own typescript file.


## Other notes :
## No quitar el index.html, ya que es la entrada al sistema para vite# Web-with-out-web-programing


