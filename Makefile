default: FORCE
	@echo make publish

publish: FORCE
	ssh dse@webonastick.com '( \
		mkdir -p git/dse.d/clocks.d && \
		cd git/dse.d/clocks.d && \
		{ [[ -e scroll-clock ]] || git clone git@github.com:dse/scroll-clock.git ; } )'
	ssh dse@webonastick.com '( cd git/dse.d/clocks.d/scroll-clock && git pull )'

.PHONY: FORCE
