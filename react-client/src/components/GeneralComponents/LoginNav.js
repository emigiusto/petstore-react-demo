import React from 'react'

import {ProductConsumer} from '../../context'

function LoginNav() {
    return (
        <ProductConsumer>
            {(contextState)=>{
                    return (
                        <div>
                        <button onClick={()=>contextState.signin("riquelme@boca.com","bocaelmasgrande")}>SIGN IN</button>
                        <button onClick={()=>contextState.signout()}>SIGN OUT</button>
                        </div>
                    )
                }
            }
        </ProductConsumer> 
    )
}

export default LoginNav
