import React from "react";
import logo from  "../public/dowmload.png"

class App extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      newitem= "",
      list : []

    }
  }

  additem(todoValue){
    if(todoValue != "")
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list ={...this.state.list}
      list.push(newItem);
      this.setState({
        list,
        newitem= ""
      })
  }

  deleteItem(id){
      const list = [...this.state.list];
      const updatedList = list.filter(item =>{item.id != id});
      this.setState({list:updatedList})

  }

updateinput(input){
  this.setState({newItem:input})
}


  render (){
    return (
      <div>
        <img src = {logo} width = "100" height = "150" className = "logo"/>
        <h1 className= "app-title"> To do List App</h1>
        <div className = "container"></div>
          Add Item....
          
          <br/>
          <input type= "text" 
          className="inputText" 
          placeholder="What to do Today"
          required
          id=""/>

        <button className = "addButton"
        onClick={
          ()=> this.additem(this.state.newItem)
        }
        disabled= {!this.state.newitem.length}
        >Add to do 
        </button>
        <div className="list">
          <ul>
            {this.state.list.map(item=>{
                return (
                  <li key= {item.id}>
                    <input
                      type = "checkbox"
                      name = "idDone"
                      checked = {item.isDone}
                      onChange={
                        ()=>{}
                      }
                    />
                    <button>
                      className="btn",
                      onClick= {()=> this.deleteItem(item.id)}
                      Delete</button>
                  </li>
                )
              })
              }
            <li>
              <input type= "checkbox" name="" id= "">Record Youtube Button</input>
              <button className= "btn"> Delete</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}

export default App;
