import React, { useState, useEffect } from 'react';
import {Button, Modal, Table} from 'react-bootstrap';

// import { GoSearch, GoPlus } from 'react-icons/go'

import api from '../../server/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

interface historyItem {
  id: number,
  fromNumber: string,
  toNumber: string,
  primes: string,
}

function Home () {

  const [fromNumber, setFromNumber] = useState('');
  const [toNumber, setToNumber] = useState('');
  const [primes, setPrimes] = useState('');
  const [history, setHistory] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    api.get(`/history`).then(response => {
      setHistory(response.data);
    })
  },[history])

  async function calculatePrimes() {
    if (!fromNumber || !toNumber) {
      alert('Preencha todos os campos!')
    } else {
      api.get(`/calculate?from=${fromNumber}&to=${toNumber}`).then(response => {
        setPrimes(response.data+" ");
      }).catch(() => {
        alert('Erro!')
      })
    }
  }

  async function deleteHistory() {
    api.delete(`/history`);
  }

  return (
    <div id="home">


      <div className="main-box">
        <div className="prime-tool">
          <h1>Ferramenta de Números Primos</h1>
          <p>Encontre os números primos no intervalo desejado.</p>
          <p>Definição: Números maiores que zero e que só são divisíveis por 1 e por eles mesmos.</p>
        </div>

        <div className="input-info">
          <p>Intervalo de</p>
          <textarea className="text-from" onChange={(e) => {setFromNumber(e.target.value)}}></textarea>
          <p>até</p>
          <textarea className="text-to" onChange={(e) => {setToNumber(e.target.value)}}></textarea>
          <Button className="button-calc" onClick={calculatePrimes}>Calcular</Button>
        </div>

        <div className="results">
          <Table className="table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{primes}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className="history">
          <p>Histórico</p>
          <Button className="button-delete" variant="danger" onClick={deleteHistory}>Apagar Histórico</Button>
        </div>

        <div className="table">
          <Table className="table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>De</th>
                <th>Até</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {history.map((historyItem: historyItem) => {
                return (
                  <>
                    <tr key={historyItem.id}>
                      <td>{historyItem.fromNumber}</td>
                      <td>{historyItem.toNumber}</td>
                      <td>{historyItem.primes}</td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </Table>
        </div>

        <Button className="button-info" variant="warning" onClick={handleShow}>Informações</Button>

        <Modal centered class="modal-content" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Informações</Modal.Title>
          </Modal.Header>
          <Modal.Body>Projeto desenvolvido para o desafio Dev Web Full Stack do Laboratório Bridge</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
          </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  )
}

export default Home;