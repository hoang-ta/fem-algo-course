export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const resut = findPath(maze, wall, start, end, {});
    console.log("result: ", resut);
    return resut;
}

function findPath(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
    visitedDict: Record<string, Point>,
): Point[] {
    const isValid = checkValidSlot(maze, wall, start, visitedDict);
    if (!isValid) return [];
    const pointId = getPointId(start);
    visitedDict[pointId] = start;
    const isFinish = start.x === end.x && start.y === end.y;
    if (isFinish) {
        return Object.values(visitedDict);
    }
    const path1 = findPath(
        maze,
        wall,
        { ...start, x: start.x + 1 },
        end,
        visitedDict,
    );
    const path2 = findPath(
        maze,
        wall,
        { ...start, x: start.x - 1 },
        end,
        visitedDict,
    );
    const path3 = findPath(
        maze,
        wall,
        { ...start, y: start.y + 1 },
        end,
        visitedDict,
    );
    const path4 = findPath(
        maze,
        wall,
        { ...start, y: start.y - 1 },
        end,
        visitedDict,
    );
    return [...path1, ...path2, ...path3, ...path4];
}

const checkValidSlot = (
    maze: string[],
    wall: string,
    start: Point,
    visitedDict: Record<string, Point>,
): boolean => {
    const isOffMap = maze[start.y]?.[start.x] === undefined;
    // console.log("isOffMap: ", maze[start.x]?.[start.y], maze);
    if (isOffMap) {
        return false;
    }
    const isWall = wall === maze[start.y][start.x];
    if (isWall) {
        return false;
    }
    // console.log("path: ", maze[start.y][start.x]);
    const pointId = getPointId(start);
    const isVisited = visitedDict[pointId];
    if (isVisited) {
        return false;
    }
    // console.log("path: ", maze[start.y][start.x]);
    return true;
};

const getPointId = (point: Point) => `${point.x}-${point.y}`;
