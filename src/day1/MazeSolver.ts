const direction = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    /** Functional style */
    // const path = findPath(maze, wall, start, end, {});
    // console.log("result: ", path);
    // return path;

    /** Another method */
    const visited: boolean[][] = [];
    for (let i = 0; i < maze.length; i++) {
        visited.push(new Array(maze[0].length).fill(false));
    }
    const path: Point[] = [];
    walk(maze, wall, start, end, visited, path);
    return path;
}

const walk = (
    maze: string[],
    wall: string,
    current: Point,
    end: Point,
    visited: boolean[][],
    path: Point[],
): boolean => {
    //base
    const isOffMap =
        current.x === maze[0].length ||
        current.x < 0 ||
        current.y === maze.length ||
        current.y < 0;
    if (isOffMap) return false;
    const isWall = maze[current.y][current.x] === wall;
    if (isWall) return false;
    const isVisited = visited[current.y][current.x];
    if (isVisited) return false;
    const isDone = current.x === end.x && current.y === end.y;
    if (isDone) {
        path.push(current);
        return true;
    }
    //pre
    visited[current.y][current.x] = true;
    path.push(current);
    //recursion
    for (let i = 0; i < direction.length; i++) {
        if (
            walk(
                maze,
                wall,
                {
                    x: current.x + direction[i][0],
                    y: current.y + direction[i][1],
                },
                end,
                visited,
                path,
            )
        ) {
            return true;
        }
    }
    //post
    return false;
};

function findPath(
    maze: string[],
    wall: string,
    current: Point,
    end: Point,
    visitedDict: Record<string, Point>,
): Point[] {
    const isValid = checkValidSlot(maze, wall, current, visitedDict);
    if (!isValid) return [];
    const pointId = getPointId(current);
    visitedDict[pointId] = current;
    const isFinish = current.x === end.x && current.y === end.y;
    if (isFinish) {
        return Object.values(visitedDict);
    }
    const path: Point[] = [];
    for (let i = 0; i < direction.length; i++) {
        const subPath = findPath(
            maze,
            wall,
            {
                x: current.x + direction[i][0],
                y: current.y + direction[i][1],
            },
            end,
            visitedDict,
        );
        path.push(...subPath);
    }
    return path;
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
