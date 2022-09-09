import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { TaskAPI } from './api/task.api';
import { TagAPI } from './api/tag.api';
import { TaskDTO } from './api/dtos/task.dto';
import { TagDTO } from './api/dtos/tag.dto';
import Container from './components/Container';
import Task from './components/Task';
import CreateTaskModal from './components/modals/CreateTaskModal';
import EditTaskModal from './components/modals/EditTaskModal';
import useFormatText from './hooks/useFormatText';

function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([])
  const [showTasks, setShowTasks] = useState<TaskDTO[]>([])
  const [toggleFilterTask, setToggleFilterTask] = useState(true)
  const [toggleFilterTags, setToggleFilterTags] = useState<number>(0)
  const [tags, setTags] = useState<TagDTO[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [taskBeingEdited, setTaskBeingEdited] = useState<TaskDTO | undefined>(undefined)

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleShowEditModal = () => setShowEditModal(true);
  const { formatText } = useFormatText()

  const addTask = (task: TaskDTO) => {
    setTasks([...tasks, task])
  }

  const updateTask = (task: TaskDTO) => {
    setTasks(tasks.map(x => {
      if (x.id === task.id)
        return task;
      return x;
    }));
  }

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(x => x.id !== taskId))
  }

  useEffect(() => {
    const fetchAllTags = async () => {
      const resp = await TagAPI.getAllTags();
      setTags(resp.data)
    }

    fetchAllTasks()
    fetchAllTags()
  }, [])

  const fetchAllTasks = async () => {
    const resp = await TaskAPI.getAll();
    setTasks(resp.data)
  }

  useEffect(() => {
    setShowTasks(tasks)
  }, [tasks])

  useEffect(() => {
    setShowTasks(tasks.filter(t => t.archived === toggleFilterTask))
  }, [toggleFilterTask])

  useEffect(() => {
    if (toggleFilterTags) {
      const ss = tasks.filter(t => { if (t.tags.find(t => t === toggleFilterTags)) return t })
      setShowTasks(ss)
    } else {
      fetchAllTasks()
    }
  }, [toggleFilterTags])

  const handleChangeSelectFilter = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === '1') {
      // setToggleFilterTask(true)
      setShowTasks(tasks.filter(t => t.archived === true))
    } else {
      // setToggleFilterTask(false)
      setShowTasks(tasks.filter(t => t.archived === false))
    }
  }

  const handleChangeFilterTags = (e: any) => {
    setToggleFilterTags(parseInt(e.target.value))
  }

  return (
    <main className="bg-dark vh-100 text-white">
      {
        showCreateModal &&
        <CreateTaskModal
          handleClose={handleCloseCreateModal}
          showModal={showCreateModal}
          onTaskCreated={addTask}
          tagNames={tags}
        />
      }
      {
        <EditTaskModal
          handleClose={handleCloseEditModal}
          showModal={showEditModal}
          onTaskUpdated={updateTask}
          data={taskBeingEdited}
          tagNames={tags}
          setTagNames={setTags}
        />
      }
      <Container>
        <h1>
          My Notes
        </h1>
        <button
          className='btn_openModal'
          onClick={handleShowCreateModal}
        >
          Create note
        </button>

        <div className="row">
          {/* <Form.Group className="mb-3" controlId="form.ControlContent"> */}
          <div className="col-2">
            <Form.Label>Filter:</Form.Label>
          </div>
          <div className="col-4">
            <Form.Select onChange={(e) => handleChangeSelectFilter(e)}>
              <option value="0">Actives</option>
              <option value="1">Archived</option>
            </Form.Select>
          </div>
          {/* </Form.Group> */}
          {/* <Form.Group className="mb-3" controlId="form.ControlContent"> */}
          <div className="col-2">
            <Form.Label>Category:</Form.Label>
          </div>
          <div className="col-4">
            <Form.Select onChange={(e) => handleChangeFilterTags(e)}>
              <option>-- Select category --</option>
              {
                tags.map((data) => (
                  <option key={data.id} value={data.id}>{data.name}</option>
                ))
              }
            </Form.Select>
          </div>
          {/* </Form.Group> */}
        </div>

        {
          showTasks.map((data) => (
            <Task
              key={data.id}
              data={data}
              onTaskDeleted={removeTask}
              onTaskUpdated={(task: TaskDTO) => {
                setTaskBeingEdited(task)
                handleShowEditModal()
              }}
              tags={tags}
            />
          ))
        }
      </Container>
    </main>
  );
}

export default App;
