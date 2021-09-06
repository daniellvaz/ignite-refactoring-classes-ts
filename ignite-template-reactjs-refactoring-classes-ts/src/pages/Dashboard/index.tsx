import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface IFood {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean,
  image: string
}

interface IState {
  foods?: IFood[],
  editingFood?: IFood,
  modalOpen?: boolean,
  editModalOpen?: boolean,
}

const Dashboard: React.FC= () => {
  const [ state, setState ] = useState<IState>({} as IState);
  const { modalOpen = false, editModalOpen, editingFood, foods } = state;

  useEffect(() => {
    async function componentDidMount() {
      const response = await api.get("/foods");

      setState({ foods: response.data });
    }

    componentDidMount();
  }, [])

  async function handleAddFood(food: IFood) {
    const { foods } = state;

    try { 
      const response = await api.post("/foods", {
        ...food,
        avaliable: true
      });

      setState({ foods: [...foods!, response.data] })
    }catch(err) {
      console.log(err);
    }
  };

  async function handleUpdateFood(food: IFood) {
    const { foods, editingFood } = state;

    const foodUpdated = await api.put(`/foods/${editingFood?.id}`, {
      ...editingFood,
      ...food,
    });

    const foodsUpdated = foods!.map((f) =>
      f.id !== foodUpdated.data.id ? f : foodUpdated.data
    );

    setState({ foods: foodsUpdated })
  }

  async function handleDeleteFood (id: number) {
    const { foods } = state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods!.filter((food) => food.id !== id);

    setState({ foods: foodsFiltered });
  };

  const toggleModal = () => {
    
    setState({ modalOpen: !modalOpen });
  };

  const toggleEditModal = () => {
    const { editModalOpen } = state;

    setState({ editModalOpen: !editModalOpen });
  };

  const handleEditFood = (food: IFood) => {
    setState({ editingFood: food, editModalOpen: true });
  };

  return (
    <>
    <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood!}
          handleUpdateFood={handleUpdateFood}
          handleAddFood={handleAddFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map((food) => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
                avaliable={true}
              />
            ))}
        </FoodsContainer>
    </>
  );
} 

export default Dashboard;
