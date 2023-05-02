import { useState, useEffect } from 'react'
import listaImg from '../assets/lista.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [name, setNome] = useState('')
  const [minibio, setminibio] = useState('')
  const [quotation, setCitacao] = useState('')
  const [image, setImagem] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://mulheres-em-tech-programaria.onrender.com'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(`${baseURL}/women`)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValueNome(event) {
    setNome(event.target.value)
  }

  function handleInputValueminibio(event) {
    setminibio(event.target.value)
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value)
  }

  function handleInputValueCitacao(event) {
    setCitacao(event.target.value)
  }

  function handleCreateMessage(event) {
    event.preventDefault()

    console.log('mensagem enviada', name, quotation, minibio, image)

    async function sendData() {
      await Axios.post(`${baseURL}/addWoman`, {
        name: name,
        quotation: quotation,
        minibio: minibio,
        image: image
      })
      const response = await Axios.get(`${baseURL}/addWoman`)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setNome('')
    setminibio('')
    setImagem('')
    setCitacao('')
  }

  return (
    <>
      <Header
        title='Mulheres em Tech Brasil'
        subtitle='Conheça personalidades femininas que estão transformando a tecnologia no Brasil'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return(
                <div key={repo._id} className={styles.cardRepo}>
                <div className={styles.cardImgContainer}>
                  <img className={styles.cardRepoImage} src={repo.image} />
                </div>
                <details>
                  <summary className={styles.cardRepoSummary}>
                    {repo.name}
                  </summary>
                  <p className={styles.cardRepoText}>{repo.minibio}</p>
                  <q className={styles.cardRepoQuote}>{repo.quotation}</q>
                </details>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <div >
        <h2 className={styles.projectsTitle}>Cadastre uma rainha tech:</h2>
        <form  className={styles.form} onSubmit={handleCreateMessage}>
          <input 
            onChange={handleInputValueNome} 
            placeholder="Digite o name"
            value={name}
            className={styles.formInput}
          />
          <textarea 
            onChange={handleInputValueImagem} 
            placeholder="Digite o link da image"
            value={image}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueminibio} 
            placeholder="Digite a minibiografia"
            value={minibio}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueCitacao} 
            placeholder="Digite a citação"
            value={quotation}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Enviar mensagem</button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}
