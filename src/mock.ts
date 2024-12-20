type DragonType = {
    id: number
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    animation: string;
    modelLink: string
}
export type Position = {
    position: [number, number, number];
    rotation: [number, number, number],
    scale: [number, number, number],
}

export const dragons: DragonType[] = [
    {
        id: 1,
        position: [-8, 6.5, 3.8],
        rotation: [0, -5, 0],
        scale: [2, 2, 2],
        animation: '',
        modelLink: '/assets/european_dragon.glb'
    },
    {
        id: 2,
        position: [8, 6.5, 3.8],
        rotation: [0, 5, 0],
        scale: [2, 2, 2],
        animation: '',
        modelLink: '/assets/european_dragon2.glb'
    },
]

function calculateCardPositionsForHand(totalCards: number, radius: number, y: number, z: number) {
    const maxArc = Math.PI / 4; // Total arc angle for the fan (adjust based on hand appearance)
    const angleStep = totalCards > 1 ? maxArc / (totalCards - 1) : 0; // Angle step between cards
    const startAngle = -(maxArc / 2); // Center the arc

    return Array.from({ length: totalCards }, (_, i) => {
        const angle = startAngle + i * angleStep; // Calculate the angle for each card
        const x = Math.sin(angle) * radius; // X position based on the angle
        const zPosition = Math.cos(angle) * radius; // Adjust Z for the arc
        const rotation = -angle; // Rotate the card to follow the arc

        return {
            position: [x, y, zPosition + z],
            rotation: [-Math.PI / 4, rotation, 0], // Forward tilt and inward rotation
            scale: [0.03, 0.03, 0.01], // Card size
        };
    });
}

// Example Usage
const totalCards = 10; // Total cards in hand
const spacing = 2; // Space between cards on the board
const radius = 5; // Adjust the arc's radius for the hand
const y = 7; // Height of the cards
const z = 6; // Depth of the cards

function calculateBoardPositions(totalCards: number, spacing: number) {
    return Array.from({ length: totalCards }, (_, i) => ({
        scale: [0.04, 0.04, 0.005],
        position: [-8 + i * spacing, 0.1, 0], // Spread cards on the board
        rotation: [-Math.PI / 2, Math.PI, 0], // Flat on the board
    }));
}

export const hearthstoneCards = calculateCardPositionsForHand(totalCards, radius, y, z).map((cardProps, index) => ({
    id: index + 1,
    initial: cardProps, // Use calculated positions and rotations for the hand
    board: calculateBoardPositions(totalCards, spacing)[index], // Unique board position
    modelLink: '/assets/poison_card.glb', // Same model for all cards
}));