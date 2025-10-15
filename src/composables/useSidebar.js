import { ref } from 'vue'

const collapsed = ref(false)

export function useSidebar() {
  const toggleSidebar = () => {
    collapsed.value = !collapsed.value
  }

  return { collapsed, toggleSidebar }
}
