import api from '../../../utils/api'

import styles from './AddPet.module.css'

import {useState} from 'react'
//import {useHistory} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

/* compnents */
import PetForm from '../../form/PetForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet() {

    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    //const history = useHistory()
    const navigate = useNavigate()

    async function registerPet(pet) {

        let msgType = 'success'

        const formData = new FormData()

        const petFormData = await Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            }else{
                formData.append(key, pet[key])
            }
        })

        formData.append('pet', petFormData)

        const data = await api.post('pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err
        })

        setFlashMessage(data.message, msgType)

        if(msgType !== 'error') {
            navigate('/pet/mypets')
        }
    }

    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText='Cadastrar Pet' />
        </section>
    )
}

export default AddPet