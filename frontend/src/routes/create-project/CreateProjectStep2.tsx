import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProjectStatus } from "src/DMS/collections/projectStatus"
import { RenderHttpError } from "../../app/components/RenderHttpError"
import { Spinner } from "../../app/Spinner"
import { useCreateProject } from "../../DMS/hooks/api/collections/project/useCreateProject"
import { useApplicationState } from "../../hooks/state/useApplicationState"
import { useProjectState } from "../../hooks/state/useProjectState"
import { ProjectForm } from "./ProjectForm"


export const CreateProjectStep1 = () => {
  const { mutation } = useCreateProject()
  const { setSelectedProject, setSelectedProjectId, projects, setProjects, projectStatuses } = useProjectState()
  const {loggedInUser } = useApplicationState()
  const navigate = useNavigate()

  useEffect(() => {
    if (mutation.isSuccess) {
      // default to selecting this project
      setSelectedProject(mutation.data)
      setSelectedProjectId(mutation?.data?._id)

      const existingProjects = projects ? [...projects] : []
      const newProjects = [...existingProjects, mutation.data]
      // update side nav
      setProjects(newProjects)

      navigate('/')
    }
  },[mutation])

  // const handleUpdteProject = (name: string, status: string) => {
  //   const userId = loggedInUser?._id || ''
  //   // ToDo check projects array for existing project with same name
  //   mutation.mutate({ name, status, userId })
  // }

  if (mutation.isLoading) {
    return <Spinner />
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      {mutation.isError && (
        <RenderHttpError message={mutation.error.message} />
      )}
      Step 2
      {/* <ProjectForm handleCreateProject={handleCreateProject} projectStatuses={projectStatuses as ProjectStatus[]} /> */}
    </Box>
  )
}
