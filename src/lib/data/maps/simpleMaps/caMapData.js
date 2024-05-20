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
      CAAB: {
        name: "Alberta",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CABC: {
        name: "British Columbia",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CAMB: {
        name: "Manitoba",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CANB: {
        name: "New Brunswick",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CANL: {
        name: "Newfoundland and Labrador",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CANS: {
        name: "Nova Scotia",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CANT: {
        name: "Northwest Territories",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CANU: {
        name: "Nunavut",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CAON: {
        name: "Ontario",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CAPE: {
        name: "Prince Edward Island",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CAQC: {
        name: "Québec",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CASK: {
        name: "Saskatchewan",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      CAYT: {
        name: "Yukon",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      }
    },
    locations: {
      "0": {
        name: "Ottawa",
        lat: "45.416667",
        lng: "-75.7"
      }
    },
    labels: {
      CAAB: {
        name: "Alberta",
        parent_id: "CAAB"
      },
      CABC: {
        name: "British Columbia",
        parent_id: "CABC"
      },
      CAMB: {
        name: "Manitoba",
        parent_id: "CAMB"
      },
      CANB: {
        name: "New Brunswick",
        parent_id: "CANB"
      },
      CANL: {
        name: "Newfoundland and Labrador",
        parent_id: "CANL"
      },
      CANS: {
        name: "Nova Scotia",
        parent_id: "CANS"
      },
      CANT: {
        name: "Northwest Territories",
        parent_id: "CANT"
      },
      CANU: {
        name: "Nunavut",
        parent_id: "CANU"
      },
      CAON: {
        name: "Ontario",
        parent_id: "CAON"
      },
      CAPE: {
        name: "Prince Edward Island",
        parent_id: "CAPE"
      },
      CAQC: {
        name: "Québec",
        parent_id: "CAQC"
      },
      CASK: {
        name: "Saskatchewan",
        parent_id: "CASK"
      },
      CAYT: {
        name: "Yukon",
        parent_id: "CAYT"
      }
    },
    legend: {
      entries: []
    },
    regions: {}
  };