import Projects from "../models/Project.js";



export const createProject_s = async (ownerId, data) => {
    const newProject = await Projects.create({ownerId, ...data});

    return newProject
}

export const updateProject_s = async (project, data) => {
    if(project.status === 'closed') {
        return { success: false, message: "cannot update a closed project" }
    }
    const update = await Projects.findByIdAndUpdate(
        {_id: project.id},
        {$set: data},
        {returnDocument: 'after'}
    );
    return update
}

export const deleteProject_s = async (project) => {
    if(project.status === "closed") {
        return { success: false, message: "cannot delete a closed project" }
    }

    const deleted = await Projects.deleteOne(project);

    return {
        success: true,
        message: "Project deleted successfuly"
    }
}

export const getOwnerProjects_s = async (ownerId) => {
    const allProjects = await Projects.find({ownerId}).sort({createAt: -1});

    return allProjects
}

export const closeProject_s = async (project) => {
    if(project.status === 'closed') {
        return { success: false, message: 'project alrady closed' }
    }

    project.status = 'closed';
    const updatedProject = await project.save()
    return {
        success: true,
        project: updatedProject
    }
}

