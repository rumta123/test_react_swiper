// src/store/pointSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 🔹 Интерфейсы
export interface Item {
  id: number;
  label: string;
}

interface PointState {
  selectedPoint: Item | null;
  targetIndex: number | null; // ← индекс, куда нужно повернуть (0–5)
}

// 🔹 Начальное состояние
const initialState: PointState = {
  selectedPoint: null,
  targetIndex: null,
};

// 🔹 Слайс
export const pointSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {
    // Устанавливает выбранную точку (например, после анимации)
    selectPoint: (state, action: PayloadAction<Item>) => {
      state.selectedPoint = action.payload;
    },

    // Команда: поверни круг к индексу (0–5)
    rotateToIndex: (state, action: PayloadAction<number>) => {
      state.targetIndex = action.payload;
    },

    // Сбрасывает команду после выполнения
    clearTargetIndex: (state) => {
      state.targetIndex = null;
    },
  },
});

// 🔹 Экспортируем действия
export const { selectPoint, rotateToIndex, clearTargetIndex } = pointSlice.actions;

// 🔹 Экспортируем редьюсер
export default pointSlice.reducer;