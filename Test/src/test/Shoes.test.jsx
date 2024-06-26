import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Shoes from "../components/Shoes/Shoes";
import { nanoid } from 'nanoid';
import { useState } from 'react';

describe('Shoes Component', () => {
    const useShoes = () => {
        const initialShoes = [ 
            { id: nanoid(), size: "" },
            { id: nanoid(), size: "" },
        ];
        const [shoes, setShoes] = useState(initialShoes);

        const addShoe = () => {
            const newShoe = { id: nanoid(), size: "" };
            setShoes([...shoes, newShoe]);
        };

        const removeShoe = (id) => {
            setShoes(shoes.filter(shoe => shoe.id !== id));
        };

        const updateSize = (id, size) => {
            setShoes(shoes.map(shoe => shoe.id === id ? { ...shoe, size } : shoe));
        };

        return { shoes, addShoe, removeShoe, updateSize };
    };

    const ShoeState = () => {
        const { shoes, addShoe, removeShoe, updateSize } = useShoes();

        return (
            <Shoes 
                updateSize={updateSize}
                addShoe={addShoe}
                removeShoe={removeShoe}
                shoes={shoes}
            />
        );
    };

    beforeEach(() => {
        render(<ShoeState />);
    });

    it('should render the correct number of shoe inputs', () => {
        const shoeSizeInputs = screen.getAllByRole('textbox');
        expect(shoeSizeInputs).toHaveLength(2);
    });

    it("should add a new shoe input when the add button is clicked", () => {
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        const shoeSizeInputs = screen.getAllByRole('textbox');
        expect(shoeSizeInputs).toHaveLength(3);
    });

    it("should remove a shoe input when the remove button is clicked", () => {
        const removeButton = screen.getAllByText("-")[0];
        fireEvent.click(removeButton);
        const shoeSizeInputs = screen.getAllByRole('textbox');
        expect(shoeSizeInputs).toHaveLength(1);
    });

    it("should update the shoe size input when changed", () => {
        const shoeSizeInput = screen.getAllByRole('textbox')[0];
        fireEvent.change(shoeSizeInput, { target: { value: '42' } });
        expect(shoeSizeInput.value).toBe('42');
    });
});
