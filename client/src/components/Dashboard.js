import React, { Component } from 'react'
import { connect } from 'react-redux'
import{getSecret} from '../actions/authActions'

class Dashboard extends Component {
     componentDidMount() {
          this.props.getSecret() 
      }
     render() {
          return (
               <div className="container">
               This is dashboard Page 
               <br />
               Our Secrect key:<h3>{this.props.secret}</h3>
               </div>
          )
     }
}

const mapStateToProps = (state) => ({
     secret:state.dashboard.secret
})


export default connect(mapStateToProps,{getSecret})(Dashboard)
