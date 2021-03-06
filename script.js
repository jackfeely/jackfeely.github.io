$(document).ready(function(){

  var skillsFilter = [];
  $('.skill-li').click(function(){
    var skillLi = $(this),
        skill = skillLi.text();
    if (skillsFilter.includes(skill)) {
      skillLi.removeClass('highlight-skill');
      skillsFilter.splice(skillsFilter.indexOf(skill, 1));
    } else {
      skillLi.addClass('highlight-skill');
      skillsFilter.push(skill);
    }

    flash($('#projects-div'));
    displayFilteredProjectsHeader(skillsFilter);
    displayFilteredProjects(skillsFilter);

  });

  function flash(element) {
    var opacity = 100;
    var color = "173, 216, 230" // has to be in this format since we use rgba
    var interval = setInterval(function() {
      opacity -= 3;
      if (opacity <= 0) clearInterval(interval);
      $(element).css({background: "rgba(" + color + ", " + opacity/100 + ")"});
    }, 30)
  }

  function displayFilteredProjectsHeader(skillsFilter) {
    if (skillsFilter.length === 0) {
      skillsFilterString = '';
    }
    else if (skillsFilter.length === 1) {
      skillsFilterString = skillsFilter.join();
    }
    else if (skillsFilter.length === 2) {
      skillsFilterString = skillsFilter.join(' & ');
    }
    else {
      skillsFilterString = skillsFilter.slice(0, skillsFilter.length-1).join(', ') + ' & ' + skillsFilter[skillsFilter.length-1]
    }

    $('#skills-filter-header').remove();
    $('#projects-div').prepend("<h3 id='skills-filter-header'>" + skillsFilterString + "</h3>");
  }

  function displayFilteredProjects(skillsFilter) {

    $('.project-div').each(function(projectDiv){
      var projectSkills = $(this).attr('skills').split(', ');

      if (skillsFilter.length == 0 || skillsFilter.every(function(skill){
        return projectSkills.indexOf(skill) >= 0;
      })) {
        $(this).show();
      } else {
        $(this).hide();
      }
    }, this)
  }

});