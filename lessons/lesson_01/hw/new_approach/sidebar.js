let sidebarOpen = false;

function openSidebar() {
  sidebarOpen = true;
  document.getElementById("sidebar").style.width = "100%";
  /* document.getElementById("main").style.marginLeft = "100%"; */
}

function closeSidebar() {
  sidebarOpen = false;
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function toggleSidebar() {
  if(sidebarOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}