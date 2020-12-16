export default interface WatchableInterface {
    coordinates: {
        x: number;
        y: number;
    };

    onCollision(angle: number): void;
}
