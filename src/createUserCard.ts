import prisma from './db';

export const createUserCard = async (userId: string) => {
  const { formatedTime, mainProject, projects, tasks } = await getUserInfo(
    userId
  );

  return `
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap" rel="stylesheet">
</head>
<body style="font-family: Roboto, sans-serif; color: #70a5fd; margin: 0; background: transparent">
  <div id='card'
    style="display: flex; flex-direction: column; background-color: #0d1117; width: 460px; height: 180px; align-items: center; justify-content: center;">
    <div style="display: flex; align-items: center;">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-tabler" width="44" height="44"
        viewBox="0 0 24 24" stroke-width="3" stroke="#3164cc" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 9l3 3l-3 3" />
        <line x1="13" y1="15" x2="16" y2="15" />
        <rect x="4" y="4" width="16" height="16" rx="4" />
      </svg>
      <h1 style="color: #3164cc"; margin: 0;">DevTime</h1>
    </div>
    <div style="display: flex; gap: 2rem;">
      <div>
      <p><span style="color: #bf91f3;">Main project:</span> ${
        mainProject.length > 20
          ? mainProject.substring(0, 17) + '...'
          : mainProject || ''
      }</p>
      <p><span style="color: #bf91f3;">Tasks:</span> ${tasks}</p>
      </div>
      <div>
        <p><span style="color: #bf91f3;">Working time:</span> ${formatedTime}</p>
        <p><span style="color: #bf91f3;">Projects:</span> ${projects}</p>
      </div>
    </div>
  </div>
</body>`;
};

async function getUserInfo(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const groupedTasks = await prisma.task.groupBy({
    where: {
      userId: user.id
    },
    by: ['projectId'],
    _sum: {
      durationInSeconds: true
    }
  });

  const tasks = await prisma.task.aggregate({
    where: {
      userId: user.id
    },
    _count: {
      _all: true
    },
    _sum: {
      durationInSeconds: true
    }
  });

  const projects = await prisma.usersOnProjects.findMany({
    where: {
      userId: user.id
    },
    include: {
      project: {
        select: {
          title: true
        }
      }
    }
  });

  let mainProjectId = '';
  let mainProject = '';
  const workingTimeInSeconds = tasks?._sum.durationInSeconds ?? 0;
  const numberOfCompletedTasks = tasks?._count._all;
  const numberOfProjects = projects?.length;

  if (groupedTasks && projects) {
    mainProjectId =
      groupedTasks.reduce((prev, curr) =>
        (prev._sum.durationInSeconds ?? 0) > (curr._sum.durationInSeconds ?? 0)
          ? prev
          : curr
      ).projectId ?? '';
    if (mainProjectId) {
    }
    mainProject =
      projects.find((project) => project.projectId === mainProjectId)?.project
        .title ?? '';
  }

  const formatedTime = workingTimeInSeconds
    ? Math.floor(workingTimeInSeconds / 3600)
      ? `${Math.floor(workingTimeInSeconds / 3600)} h`
      : Math.floor(workingTimeInSeconds / 60)
      ? `${Math.floor(workingTimeInSeconds / 60)}`
      : '0 min'
    : '0 min';

  return {
    mainProject,
    projects: numberOfProjects,
    tasks: numberOfCompletedTasks,
    formatedTime
  };
}
