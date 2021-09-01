import React, { createRef, ReactNode, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles, SubmitHandler } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import Food from '../Food';

interface IFood {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean,
  image: string
}

interface IProps {
  setIsOpen: () => void;
  isOpen?: boolean;
  handleAddFood: (food: IFood) => Promise<void>;
}

interface FormData {
  image: string;
  name: string;
  price: string;
  description: string;
}

const ModalAddFood: React.FC<IProps> = (props: IProps) => {
  const { isOpen, setIsOpen } = props;
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: IFood ) => {
    const { setIsOpen, handleAddFood } =  props;

    handleAddFood(data);
    setIsOpen();
  };

  return(
     <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
  );
}

export default ModalAddFood;
