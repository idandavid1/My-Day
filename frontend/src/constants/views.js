import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded'

export const views =
      [
            {
                  name: "Boards",
                  icon: <SpaceDashboardOutlinedIcon />,
                  description: "Everything starts with a visual board — the core of monday.com Work OS. Tailor it your way and manage anything from projects to departments."
            },
            {
                  name: "Kanbans",
                  icon: <ViewKanbanOutlinedIcon />,
                  description: "Visualize and plan your work more efficiently with multiple views: Kanban board, calendar, timeline, Gantt chart, and more."
            },
            {
                  name: "Dashboards",
                  icon: <EqualizerRoundedIcon />,
                  description: "Get the insights you need to make decisions with confidence. Keep track of progress, timelines, and budgets with custom dashboards."
            }
      ]