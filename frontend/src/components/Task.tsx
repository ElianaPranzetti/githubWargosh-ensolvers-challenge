import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { TagDTO } from '../api/dtos/tag.dto';
import { TaskDTO } from '../api/dtos/task.dto'
import { TaskAPI } from "../api/task.api";

type Props = {
    data: TaskDTO;
    onTaskDeleted: (taskId: number) => void;
    onTaskUpdated: (task: TaskDTO) => void;
    tags: TagDTO[];
}

const Task = ({ data, onTaskDeleted, onTaskUpdated, tags }: Props) => {
    const deleteTask = async () => {
        await TaskAPI.deleteTask(data.id);
        onTaskDeleted(data.id)
    }

    return (
        <>
            <Card style={{ width: '18rem' }} bg="light" border="dark" text='dark'>
                <Card.Header>
                    {
                        data.tags.map((t) => (
                            <Badge key={t} bg="dark">{tags.find((x) => x.id === t)?.name}</Badge>
                        ))
                    }
                </Card.Header>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="danger" type="button" onClick={deleteTask}>
                        Delete
                    </Button>
                    <Button variant="primary" type="button" onClick={() => onTaskUpdated(data)}>
                        Edit
                    </Button>
                </Card.Footer>
            </Card>
        </>
    )
}

export default Task