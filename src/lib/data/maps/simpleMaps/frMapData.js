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
      DEBB: {
        name: "Brandenburg",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DEBE: {
        name: "Berlin",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DEBW: {
        name: "Baden-Württemberg",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DEBY: {
        name: "Bayern",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DEHB: {
        name: "Bremen",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DEHE: {
        name: "Hessen",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DEHH: {
        name: "Hamburg",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DEMV: {
        name: "Mecklenburg-Vorpommern",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DENI: {
        name: "Niedersachsen",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DENW: {
        name: "Nordrhein-Westfalen",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DERP: {
        name: "Rheinland-Pfalz",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DESH: {
        name: "Schleswig-Holstein",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DESL: {
        name: "Saarland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DESN: {
        name: "Sachsen",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DEST: {
        name: "Sachsen-Anhalt",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      DETH: {
        name: "Thüringen",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      }
    },
    locations: {
      "0": {
        name: "Berlin",
        lat: "52.516667",
        lng: "13.4"
      }
    },
    labels: {
      DEBB: {
        name: "Brandenburg",
        parent_id: "DEBB"
      },
      DEBE: {
        name: "Berlin",
        parent_id: "DEBE"
      },
      DEBW: {
        name: "Baden-Württemberg",
        parent_id: "DEBW"
      },
      DEBY: {
        name: "Bayern",
        parent_id: "DEBY"
      },
      DEHB: {
        name: "Bremen",
        parent_id: "DEHB"
      },
      DEHE: {
        name: "Hessen",
        parent_id: "DEHE"
      },
      DEHH: {
        name: "Hamburg",
        parent_id: "DEHH"
      },
      DEMV: {
        name: "Mecklenburg-Vorpommern",
        parent_id: "DEMV"
      },
      DENI: {
        name: "Niedersachsen",
        parent_id: "DENI"
      },
      DENW: {
        name: "Nordrhein-Westfalen",
        parent_id: "DENW"
      },
      DERP: {
        name: "Rheinland-Pfalz",
        parent_id: "DERP"
      },
      DESH: {
        name: "Schleswig-Holstein",
        parent_id: "DESH"
      },
      DESL: {
        name: "Saarland",
        parent_id: "DESL"
      },
      DESN: {
        name: "Sachsen",
        parent_id: "DESN"
      },
      DEST: {
        name: "Sachsen-Anhalt",
        parent_id: "DEST"
      },
      DETH: {
        name: "Thüringen",
        parent_id: "DETH"
      }
    },
    legend: {
      entries: []
    },
    regions: {}
  };