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
      NLDR: {
        name: "Drenthe",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLFL: {
        name: "Flevoland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLFR: {
        name: "Friesland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLGE: {
        name: "Gelderland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLGR: {
        name: "Groningen",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLLI: {
        name: "Limburg",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLNB: {
        name: "Noord-Brabant",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLNH: {
        name: "Noord-Holland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLOV: {
        name: "Overijssel",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLUT: {
        name: "Utrecht",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLZE: {
        name: "Zeeland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      NLZH: {
        name: "Zuid-Holland",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      }
    },
    locations: {
      "0": {
        name: "The Hague",
        lat: "52.083333",
        lng: "4.3"
      }
    },
    labels: {
      NLDR: {
        name: "Drenthe",
        parent_id: "NLDR"
      },
      NLFL: {
        name: "Flevoland",
        parent_id: "NLFL"
      },
      NLFR: {
        name: "Friesland",
        parent_id: "NLFR"
      },
      NLGE: {
        name: "Gelderland",
        parent_id: "NLGE"
      },
      NLGR: {
        name: "Groningen",
        parent_id: "NLGR"
      },
      NLLI: {
        name: "Limburg",
        parent_id: "NLLI"
      },
      NLNB: {
        name: "Noord-Brabant",
        parent_id: "NLNB"
      },
      NLNH: {
        name: "Noord-Holland",
        parent_id: "NLNH"
      },
      NLOV: {
        name: "Overijssel",
        parent_id: "NLOV"
      },
      NLUT: {
        name: "Utrecht",
        parent_id: "NLUT"
      },
      NLZE: {
        name: "Zeeland",
        parent_id: "NLZE"
      },
      NLZH: {
        name: "Zuid-Holland",
        parent_id: "NLZH"
      }
    },
    legend: {
      entries: []
    },
    regions: {}
  };