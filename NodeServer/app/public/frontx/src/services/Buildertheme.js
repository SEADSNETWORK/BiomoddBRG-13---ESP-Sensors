import Theme from '../theme'


class BuilderTheme extends Theme {
    constructor(){
      super()
      this.font = "OfficeCodePro"
      this.sizes.normal = "1.2em"
    }
  
    get defaultFont(){
      return `${super.defaultFont}font-weight: 400;`
    }
  
    get Title(){
      return this.styled(super.Title)` font-weight: bold;`
    }
  }
  
  

  export default BuilderTheme;