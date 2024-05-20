var simplemaps_countrymap_mapdata={
    main_settings: {
     //General settings
      width: "responsive", //'700' or 'responsive'
      background_color: "#FFFFFF",
      background_transparent: "yes",
      border_color: "#ffffff",
      
      //State defaults
      state_description: "State description",
      state_color: "#88A4BC",
      state_hover_color: "#3B729F",
      state_url: "",
      border_size: 1.5,
      all_states_inactive: "no",
      all_states_zoomable: "yes",
      
      //Location defaults
      location_description: "Location description",
      location_url: "",
      location_color: "#FF0067",
      location_opacity: 0.8,
      location_hover_opacity: 1,
      location_size: 25,
      location_type: "square",
      location_image_source: "frog.png",
      location_border_color: "#FFFFFF",
      location_border: 2,
      location_hover_border: 2.5,
      all_locations_inactive: "no",
      all_locations_hidden: "no",
      
      //Label defaults
      label_color: "#ffffff",
      label_hover_color: "#ffffff",
      label_size: 16,
      label_font: "Arial",
      label_display: "auto",
      label_scale: "yes",
      hide_labels: "no",
      hide_eastern_labels: "no",
     
      //Zoom settings
      zoom: "yes",
      manual_zoom: "yes",
      back_image: "no",
      initial_back: "no",
      initial_zoom: "-1",
      initial_zoom_solo: "no",
      region_opacity: 1,
      region_hover_opacity: 0.6,
      zoom_out_incrementally: "yes",
      zoom_percentage: 0.99,
      zoom_time: 0.5,
      
      //Popup settings
      popup_color: "white",
      popup_opacity: 0.9,
      popup_shadow: 1,
      popup_corners: 5,
      popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
      popup_nocss: "no",
      
      //Advanced settings
      div: "map",
      auto_load: "yes",
      url_new_tab: "no",
      images_directory: "default",
      fade_time: 0.1,
      link_text: "View Website",
      popups: "detect"
    },
    state_specific: {
      SEAB: {
        name: "Stockholm",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEAC: {
        name: "Västerbotten",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEBD: {
        name: "Norrbotten",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEC: {
        name: "Uppsala",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SED: {
        name: "Södermanland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEE: {
        name: "Östergötland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEF: {
        name: "Jönköping",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEG: {
        name: "Kronoberg",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEH: {
        name: "Kalmar",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEI: {
        name: "Gotland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEK: {
        name: "Blekinge",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEM: {
        name: "Skåne",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEN: {
        name: "Halland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEO: {
        name: "Västra Götaland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SES: {
        name: "Värmland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SET: {
        name: "Orebro",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEU: {
        name: "Västmanland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEW: {
        name: "Dalarna",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEX: {
        name: "Gävleborg",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEY: {
        name: "Västernorrland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      SEZ: {
        name: "Jämtland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      }
    },
    locations: {
      "0": {
        name: "Stockholm",
        lat: "59.333333",
        lng: "18.05"
      }
    },
    labels: {
      SEAB: {
        name: "Stockholm",
        parent_id: "SEAB"
      },
      SEAC: {
        name: "Västerbotten",
        parent_id: "SEAC"
      },
      SEBD: {
        name: "Norrbotten",
        parent_id: "SEBD"
      },
      SEC: {
        name: "Uppsala",
        parent_id: "SEC"
      },
      SED: {
        name: "Södermanland",
        parent_id: "SED"
      },
      SEE: {
        name: "Östergötland",
        parent_id: "SEE"
      },
      SEF: {
        name: "Jönköping",
        parent_id: "SEF"
      },
      SEG: {
        name: "Kronoberg",
        parent_id: "SEG"
      },
      SEH: {
        name: "Kalmar",
        parent_id: "SEH"
      },
      SEI: {
        name: "Gotland",
        parent_id: "SEI"
      },
      SEK: {
        name: "Blekinge",
        parent_id: "SEK"
      },
      SEM: {
        name: "Skåne",
        parent_id: "SEM"
      },
      SEN: {
        name: "Halland",
        parent_id: "SEN"
      },
      SEO: {
        name: "Västra Götaland",
        parent_id: "SEO"
      },
      SES: {
        name: "Värmland",
        parent_id: "SES"
      },
      SET: {
        name: "Orebro",
        parent_id: "SET"
      },
      SEU: {
        name: "Västmanland",
        parent_id: "SEU"
      },
      SEW: {
        name: "Dalarna",
        parent_id: "SEW"
      },
      SEX: {
        name: "Gävleborg",
        parent_id: "SEX"
      },
      SEY: {
        name: "Västernorrland",
        parent_id: "SEY"
      },
      SEZ: {
        name: "Jämtland",
        parent_id: "SEZ"
      }
    },
    legend: {
      entries: []
    },
    regions: {}
  };